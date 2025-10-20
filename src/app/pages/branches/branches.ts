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
import { BranchesService } from '../../services/branches.service';

enum FilterState {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE', 
  INACTIVE = 'INACTIVE'
}

@Component({
  selector: 'app-branches',
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
  templateUrl: './branches.html',
  styleUrl: './branches.scss'
})
export class Branches {

  filterStates = {
    ALL: FilterState.ALL,
    ACTIVE: FilterState.ACTIVE,
    INACTIVE: FilterState.INACTIVE,
  };
  branches?: Array<Partial<User>>;
  selectedUser?: Partial<User>;
  displayedColumns: Array<string> = ['name', 'address', 'city', 'createdAt', 'updatedAt', 'inactive'];
  filterStatus: FilterState = FilterState.ACTIVE;

  constructor(
    private branchesService: BranchesService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBranches(this.filterStatus);
  }

  getBranches(status: string){
    this.branchesService.getBranches(status)
      .then((branches: Array<Partial<User>>) => {
        this.branches = branches;
      })
      .catch((error: Error) => {
        this.snackbar.open(error.message, "ok", { duration: 3000 });
      });
  }

  

  // Cambiar filtro desde la UI
  setFilter(status: FilterState) {
    this.filterStatus = status;
    this.getBranches(status);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  createUser() {
    this.router.navigate(['branches/create']);
  }

  editUser() {
    this.router.navigate([`branches/${this.selectedUser?.id}`]);
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

    this.branchesService.deactivateBranch(this.selectedUser.id!).subscribe({
      next: (res) => {
        this.snackbar.open(res.message, 'OK', { duration: 3000 });
        this.branches = this.branches!.filter(u => u.id !== this.selectedUser?.id);
      },
      error: (err) => {
        console.error(err);
        this.snackbar.open('Error al inactivar el usuario', 'OK', { duration: 3000 });
      }
    });
  }
}
