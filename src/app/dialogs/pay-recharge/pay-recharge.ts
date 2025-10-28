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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay-recharge',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './pay-recharge.html',
  styleUrl: './pay-recharge.scss'
})
export class PayRecharge {

  rechargeForm: FormGroup;
  products?: Array<Product>;
  imagesSrc : string = ''
  processing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { providerId: number },
    private dialogRef: MatDialogRef<PayRecharge>,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
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
    lastValueFrom(this.http.get<Array<Product>>(`${environment.apiUrl}/products/recharges`, {params: {providerId: this.data.providerId}}))
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

  makeRecharge(){
    this.processing = true;
    const { number, confirmNumber, product } = this.rechargeForm.value;
    const userId = window.localStorage.getItem('userId');
    lastValueFrom(this.http.post<{message : string}>(`${environment.apiUrl}/sales/recharge`, { userId, phoneNumber: number, productId: product }))
    .then((res) => {
      this.snackbar.open('Recarga hecha con éxito', 'aceptar', { duration: 1000 });
      this.dialogRef.close();
    })
    .catch((err) => {
      this.snackbar.open('Hubo un problema al realizar la recarga, reintenta mas tarde', 'aceptar', { duration: 1000 });
      this.dialogRef.close();
    })
    .finally(() => {
      this.processing = false;
    });
  }
}
