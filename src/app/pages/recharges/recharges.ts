import { Component, OnInit } from '@angular/core';
import { RechargesService, Product } from '../../services/recharges';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgIf, CurrencyPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-recharges',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './recharges.html',
  styleUrls: ['./recharges.scss']
})
export class Recharges implements OnInit {

  providers: any[] = [];
  filteredProducts: Product[] = [];
  displayedColumns: string[] = ['name', 'code', 'description', 'amount'];
  loading: boolean = true;

  filterControl = new FormControl('');

  constructor(
    private rechargesService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.filterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.applyFilter(value!));
  }

  async loadProducts() {
    this.loading = true;
    try {
      this.providers = await this.rechargesService.getProviders('RECHARGES');
      this.filteredProducts = [...this.providers];
    } catch (err) {
      console.error('Error al cargar productos', err);
    } finally {
      this.loading = false;
    }
  }

  applyFilter(value: string) {
    if (!value) {
      this.filteredProducts = [...this.providers];
      return;
    }

    const normalizedValue = this.normalizeString(value);
    const regex = new RegExp(normalizedValue, 'i');

    this.filteredProducts = this.providers.filter(product =>
      regex.test(this.normalizeString(product.name)) ||
      regex.test(this.normalizeString(product.code))
    );
  }

  normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita acentos
      .replace(/[^\w\s]/gi, '')       // quita signos de puntuación
      .toLowerCase();
  }
}
