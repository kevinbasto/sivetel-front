import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pin } from '../../interfaces/pin'; 
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay-pin',
    imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './pay-pin.html',
  styleUrl: './pay-pin.scss'
})
export class PayPin implements OnInit{

  rechargeForm: FormGroup;
  pins?: Array<Pin>;
  imagesSrc : string = '';
  processing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { providerId: number },
    private dialogRef: MatDialogRef<PayPin>,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.rechargeForm = this.fb.group({
      number: [''],
      confirmNumber: [''],
      pin: ['']
    })
    this.imagesSrc = `${environment.apiUrl}/products/provider-image/${this.data.providerId}`;
    console.log("starting up")
    this.fetchPins();
  }

  ngOnInit(): void {
    console.log("starting up")
    this.fetchPins();
  }

  fetchPins() {
    lastValueFrom(this.http.get<Array<Pin>>(`${environment.apiUrl}/products/pins`, {params: {providerId: this.data.providerId}}))
    .then((pins: Array<Pin>) => {
      console.log(pins);
      this.pins = pins;
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
    const { number, confirmNumber, pin } = this.rechargeForm.value;
    lastValueFrom(this.http.post<{message : string}>(`${environment.apiUrl}/sales/pin`, { userId: 1, phoneNumber: number, productId: pin }))
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
