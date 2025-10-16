import { Component, OnInit } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../services/products';
import { Service } from '../../interfaces/service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class Services implements OnInit {

  services: Service[] = [];
  filteredServices: Service[] = [];
  displayedColumns: string[] = ['name', 'code', 'description', 'price'];
  loading: boolean = true;

  filterControl = new FormControl('');

  constructor(private servicesService: ProductsService) {}

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
      this.services = await this.servicesService.getServices();
      this.filteredServices = [...this.services];
    } catch (err) {
      console.error('Error al cargar servicios', err);
    } finally {
      this.loading = false;
    }
  }

  applyFilter(value: string) {
    if (!value) {
      this.filteredServices = [...this.services];
      return;
    }

    const normalizedValue = this.normalizeString(value);
    const regex = new RegExp(normalizedValue, 'i');

    this.filteredServices = this.services.filter(service =>
      regex.test(this.normalizeString(service.name)) ||
      regex.test(this.normalizeString(service.code))
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
