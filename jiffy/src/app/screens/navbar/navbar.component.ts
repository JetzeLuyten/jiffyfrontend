import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../auth0/login/login.component';
import { SignupComponent } from '../../auth0/signup/signup.component';
import { LogoutComponent } from '../../auth0/logout/logout.component';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, SignupComponent, LogoutComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  navbarOpen = false;

  isAuthenticated = signal(false);
  isAdmin = signal(false);

  constructor(private authService: AuthService, public roleService: RoleService) {
    this.authService.isAuthenticated$.subscribe((auth: boolean) => {
      this.isAuthenticated.set(auth)
    });

    this.roleService.hasPermission("getall:services").subscribe(r => {
      this.isAdmin.set(r);
    })
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
