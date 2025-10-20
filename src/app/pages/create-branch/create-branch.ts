import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { BranchesService } from '../../services/branches.service';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-branch',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-branch.html',
  styleUrl: './create-branch.scss'
})
export class CreateBranch {

  uploading: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchesService: BranchesService,
    private snackbar: MatSnackBar
  ){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }

  cancel() {
    this.router.navigate(['/branches']);
  }

  submit() {
    this.uploading = true;
    let branch = this.form.value;
    lastValueFrom(this.branchesService.createBranch(branch))
    .then(() => {
      this.snackbar.open("Sucursal creada con éxito", "ok", {duration: 3000});
      this.router.navigate(['branches'])
    })
    .catch(() => {
      this.snackbar.open("Hubo un error al procesar la solicitud, reintenta mas tarde", "ok", {duration: 3000});
    })
    .finally(() => {
      this.uploading = false;
    })
  }
}
