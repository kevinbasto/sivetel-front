import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, TouchedChangeEvent } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BranchesService } from '../../services/branches.service';
import { lastValueFrom } from 'rxjs';
import { Branch } from '../../interfaces/branch';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-branch',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-branch.html',
  styleUrl: './edit-branch.scss'
})
export class EditBranch {
  form!: FormGroup;
  isLoading = true;
  isSubmitting = false;
  branchId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private branchesService: BranchesService
  ) {}

  ngOnInit() {
    this.branchId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      name: [''],
      address: [''],
      city: [''],
      inactive: [''],
    });

    this.loadUser();
  }

  loadUser() {
    lastValueFrom(this.branchesService.getBranchById(this.branchId))
    .then((branch: Branch) => {
      const {name, address, city, inactive} = branch;
      this.form.setValue({name, address, city, inactive});
    })
    .catch(() => {
      this.snackBar.open("Hubo un problema para obtener tu usuario", "ok", {duration: 3000});
      this.router.navigate(['/branches'])
    });
  }

  cancel() {
    this.router.navigate(['/users'])
  }

  submit() {
    this.isSubmitting = true;
    const value = this.form.value;
    lastValueFrom(this.branchesService.updateBranch(this.branchId, value))
    .then(() => {
      this.snackBar.open("Sucursal actualizada con éxito", "ok", { duration: 3_000 });
      this.router.navigate(['/branches']);
    })
    .catch(() => {
      this.snackBar.open("Hubo un problema al actualizar la sucursal", "ok", { duration: 3_000 });
      
    })
    .finally(() => {
      this.isSubmitting = false;
    });
  }
}
