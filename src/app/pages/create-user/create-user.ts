import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { BranchesService } from '../../services/branches.service';
import { Branch } from '../../interfaces/branch';
import { MatSelectModule } from '@angular/material/select';

@Component({
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterModule
  ],
  standalone: true,
  selector: 'app-create-user',
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.scss']
})
export class CreateUser implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;
  branches : Array<Branch> = [];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private branchesService: BranchesService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      branch: [''],
      isAdmin: [false]
    });
    this.branchesService.getBranches('ACTIVE')
    .then((branches) => {
      this.branches = branches;
    })
    .catch(() => {});

  }

  cancel() {
    this.router.navigate(['/users'])
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.usersService.createUser(this.userForm.value).subscribe({
      next: () => {
        this.snackBar.open('Usuario creado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/users']);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear el usuario', 'Cerrar', { duration: 3000 });
        this.isSubmitting = false;
      }
    });
  }

}
