import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { modulesRouting } from '../../../environments/modules-routing';
import { AuthService } from '../../services/auth';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './client-layout.html',
  styleUrls: ['./client-layout.scss']
})
export class ClientLayout implements OnInit {
  opened = true;
  routes = modulesRouting;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let isAdmin = eval(window.localStorage.getItem('isAdmin')!);
    if(!isAdmin){
      const filtered = this.routes.filter(route => !route.isAdmin);
      this.routes = filtered;
    }
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
