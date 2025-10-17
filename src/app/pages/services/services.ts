import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../services/products';
import { MatInputModule } from '@angular/material/input';
import { Provider } from '../../interfaces/provider';
import { environment } from '../../../environments/environment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PayService } from '../../dialogs/pay-service/pay-service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class Services implements OnInit {

  providers: Provider[] = [];
  filteredProviders: Provider[] = [];
  displayedColumns: string[] = ['name', 'code', 'description', 'price'];
  loading: boolean = true;

  filterControl = new FormControl('');
  imagesSrc = environment.apiUrl;

  constructor(
    private productsService: ProductsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadServices();

    // Filtrado local con debounce
    this.filterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.applyFilter(value!));
  }

  async loadServices() {
    this.loading = true;
    try {
      this.providers = await this.productsService.getProviders("SERVICES");
      this.filteredProviders = [...this.providers];
    } catch (err) {
      console.error('Error al cargar servicios', err);
    } finally {
      this.loading = false;
    }
  }

  applyFilter(value: string) {
    if (!value) {
      this.filteredProviders = [...this.providers];
      return;
    }

    const normalizedValue = this.normalizeString(value);
    const regex = new RegExp(normalizedValue, 'i');

    this.filteredProviders = this.providers.filter(provider =>
      regex.test(this.normalizeString(provider.name))
    );
  }

  normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quitar acentos
      .replace(/[^\w\s]/gi, '')        // quitar signos de puntuación
      .toLowerCase();
  }

  payService(providerId: number) {
    this.matDialog.open(PayService, { data: { providerId } });
  }
}
