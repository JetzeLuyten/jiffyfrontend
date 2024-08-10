import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: '<p>Loading...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.handleRedirectCallback().subscribe(() => {
      this.router.navigate(['/']); // Redirect to home or desired page
    });
  }
}
