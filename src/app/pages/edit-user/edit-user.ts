import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UpdateUserDto } from '../../interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonModule,
    NgIf,
    
  ],
  selector: 'app-edit-user',
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.scss']
})
export class EditUser implements OnInit {
  userForm!: FormGroup;
  isLoading = true;
  isSubmitting = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: [''], // opcional
      isAdmin: [false],
      inactive: [false]
    });

    this.loadUser();
  }

  loadUser() {
    this.usersService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.userForm.patchValue({
          name: user.name,
          isAdmin: user.isAdmin,
          inactive: user.inactive
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al cargar el usuario', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/users'])
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const updateData: UpdateUserDto = { ...this.userForm.value };
    if (!updateData.password) delete updateData.password; // solo enviar si hay contraseña

    this.isSubmitting = true;
    this.usersService.updateUser(this.userId, updateData).subscribe({
      next: () => {
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.isSubmitting = false;
        this.router.navigate(['/users']); // regresar al listado
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al actualizar el usuario', 'Cerrar', { duration: 3000 });
        this.isSubmitting = false;
      }
    });
  }

  // Getters para template
  get name() { return this.userForm.get('name'); }
  get password() { return this.userForm.get('password'); }
  get isAdmin() { return this.userForm.get('isAdmin'); }
  get inactive() { return this.userForm.get('inactive'); }
}
