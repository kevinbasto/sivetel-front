import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Pin } from '../../interfaces/pin';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pins',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe,
    MatInputModule
  ],
  templateUrl: './pins.html',
  styleUrls: ['./pins.scss']
})
export class Pins implements OnInit {

  pins: Pin[] = [];
  filteredPins: Pin[] = [];
  displayedColumns: string[] = ['name', 'code', 'description', 'amount'];
  loading: boolean = true;

  filterControl = new FormControl('');

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadPins();

    // Filtro local con debounce
    this.filterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.applyFilter(value!));
  }

  async loadPins() {
    this.loading = true;
    try {
      this.pins = await this.productsService.getPins();
      this.filteredPins = [...this.pins];
    } catch (err) {
      console.error('Error al cargar pins', err);
    } finally {
      this.loading = false;
    }
  }

  applyFilter(value: string) {
    if (!value) {
      this.filteredPins = [...this.pins];
      return;
    }

    const normalizedValue = this.normalizeString(value);
    const regex = new RegExp(normalizedValue, 'i');

    this.filteredPins = this.pins.filter(pin =>
      regex.test(this.normalizeString(pin.name)) ||
      regex.test(this.normalizeString(pin.code))
    );
  }

  normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quitar acentos
      .replace(/[^\w\s]/gi, '')        // quitar signos de puntuación
      .toLowerCase();
  }
}
