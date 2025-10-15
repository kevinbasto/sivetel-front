import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { modulesRouting } from '../../../environments/modules-routing';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './client-layout.html',
  styleUrls: ['./client-layout.scss']
})
export class ClientLayout {
  opened = true;
  routes = modulesRouting;

  toggleSidenav() {
    this.opened = !this.opened;
  }
}
