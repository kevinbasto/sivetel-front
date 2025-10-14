import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../../core/interfaces/user';

import { MatTableModule } from "@angular/material/table";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-users',
  imports: [
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
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
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usersService.getClients()
    .then((users: Array<Partial<User>>) => {
      this.users = users;
    })
    .catch((error: Error) => {
      this.snackbar.open(error.message, "ok", {duration: 3000});
    })
  }

  selectUser(user: User) {
    console.log(user);
  }
}
