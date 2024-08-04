import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private auth: AuthService) {}
  
  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.home_url, // this is where we redirect to when the user is logged out
      },
    });
  }
}
