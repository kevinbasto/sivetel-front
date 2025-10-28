import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  async submit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;

  try {
    // Llamada al servicio Auth
    const res = await this.auth.login(this.loginForm.value);
    
    // Login exitoso
    this.snackBar.open('Login exitoso', 'Cerrar', { duration: 3000 });

    // Redirigir al panel de usuarios
    this.router.navigate(['/users']);

  } catch (err: any) {
    console.error(err);
    // Mostrar error al usuario
    this.snackBar.open(err?.error?.message || 'Usuario o contraseña incorrecta', 'Cerrar', { duration: 3000 });
  } finally {
    this.isSubmitting = false;
  }
}
}
