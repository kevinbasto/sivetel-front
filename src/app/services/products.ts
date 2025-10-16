import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pin } from '../interfaces/pin';
import { Product } from '../interfaces/product';
import { Service } from '../interfaces/service';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getPins() {
    return lastValueFrom(this.http.get<Array<Pin>>(`${this.apiUrl}/pins`));
  }

  getProducts() {
    return lastValueFrom(this.http.get<Array<Product>>(`${this.apiUrl}/recharges`));
  }

  getServices() {
    return lastValueFrom(this.http.get<Array<Service>>(`${this.apiUrl}/services`));
  }

}
