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
import { NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



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
    RouterModule
],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  users?: Array<Partial<User>>;
  selectedUser? : Partial<User>
  displayedColumns : Array<string> = ['name', 'username']

  constructor(
    private usersService: UsersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers()
    .then((users: Array<Partial<User>>) => {
      this.users = users;
    })
    .catch((error: Error) => {
      this.snackbar.open(error.message, "ok", {duration: 3000});
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  createUser() {
    this.router.navigate(['users/create-user'])
  }

  editUser() {
    this.router.navigate([`users/${this.selectedUser?.id}`]);
  }
}
