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
import { Service } from '../../interfaces/service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pay-service',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './pay-service.html',
  styleUrl: './pay-service.scss'
})
export class PayService {

  processing : boolean = false;
  rechargeForm: FormGroup;
  service?: Service;
  imagesSrc : string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { providerId: number },
    private dialogRef: MatDialogRef<PayService>,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.rechargeForm = this.fb.group({
      reference: [''],
      amount: ['']
    })
    this.imagesSrc = `${environment.apiUrl}/products/provider-image/${this.data.providerId}`;
    this.fetchProducts();
  }

  fetchProducts() {
    lastValueFrom(this.http.get<Array<Product>>(`${environment.apiUrl}/products/services`, {params: {providerId: this.data.providerId}}))
    .then((services: Array<Product>) => {
      this.service = services[0];
    })
    .catch((err) => {
      console.log(err);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  makeService(){
    this.processing = true;
    const { reference, amount } = this.rechargeForm.value;
    lastValueFrom(this.http.post<{message : string}>(`${environment.apiUrl}/sales/service`, { 
      userId: 1, 
      serviceId: this.service!.id,
      amount: amount,
      reference
    }))
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
