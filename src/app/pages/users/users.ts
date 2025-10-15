import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users';
import { User } from '../../interfaces/user';

import { MatTableModule } from "@angular/material/table";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { DatePipe, NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

enum FilterState {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE', 
  INACTIVE = 'INACTIVE'
}

@Component({
  selector: 'app-users',
  imports: [
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgClass,
    RouterModule,
    DatePipe
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  filterStates = {
    ALL: FilterState.ALL,
    ACTIVE: FilterState.ACTIVE,
    INACTIVE: FilterState.INACTIVE,
  };
  users?: Array<Partial<User>>;
  selectedUser?: Partial<User>;
  displayedColumns: Array<string> = ['name', 'username', 'createdAt', 'updatedAt', 'inactive'];
  filterStatus: FilterState = FilterState.ACTIVE;

  constructor(
    private usersService: UsersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers(this.filterStatus)
      .then((users: Array<Partial<User>>) => {
        this.users = users;
      })
      .catch((error: Error) => {
        this.snackbar.open(error.message, "ok", { duration: 3000 });
      });
  }

  

  // Cambiar filtro desde la UI
  setFilter(status: FilterState) {
    this.filterStatus = status;
    this.getUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  createUser() {
    this.router.navigate(['users/create']);
  }

  editUser() {
    this.router.navigate([`users/${this.selectedUser?.id}`]);
  }

  deleteUser() {
    if (!this.selectedUser) {
      this.snackbar.open('Selecciona un usuario primero', 'OK', { duration: 3000 });
      return;
    }

    const confirmed = window.confirm(
      `¿Estás seguro de que quieres inactivar al usuario "${this.selectedUser.name}"? Esta acción no se puede deshacer fácilmente.`
    );

    if (!confirmed) return;

    this.usersService.deactivateUser(this.selectedUser.id!).subscribe({
      next: (res) => {
        this.snackbar.open(res.message, 'OK', { duration: 3000 });
        this.users = this.users!.filter(u => u.id !== this.selectedUser?.id);
      },
      error: (err) => {
        console.error(err);
        this.snackbar.open('Error al inactivar el usuario', 'OK', { duration: 3000 });
      }
    });
  }
}

