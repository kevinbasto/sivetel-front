import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-pay-service',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './pay-service.html',
  styleUrl: './pay-service.scss'
})
export class PayService {

  rechargeForm: FormGroup;
  products?: Array<Product>;
  imagesSrc : string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { providerId: number },
    private dialogRef: MatDialogRef<PayService>,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.rechargeForm = this.fb.group({
      number: [''],
      confirmNumber: [''],
      product: ['']
    })
    this.imagesSrc = `${environment.apiUrl}/products/provider-image/${this.data.providerId}`;
    this.fetchProducts();
  }

  fetchProducts() {
    lastValueFrom(this.http.get<Array<Product>>(`${environment.apiUrl}/products/services`, {params: {providerId: this.data.providerId}}))
    .then((products: Array<Product>) => {
      this.products = products;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  makeService(){}
}
