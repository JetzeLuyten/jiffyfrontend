import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ServicesComponent } from '../../service/services.component';
import { MenuComponent } from "../menu/menu.component";
import { Observable } from 'rxjs';
import { Service } from '../../model/service';
import { ServicesService } from '../../services/service.services';
import { Router } from '@angular/router';
import { LoginComponent } from "../../auth0/login/login.component";
import { AuthService } from '@auth0/auth0-angular';
import { ServiceShopComponent } from "../../service/service-shop/service-shop.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuComponent, ServicesComponent, LoginComponent, ServiceShopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  services$: Observable<Service[]> = new Observable<Service[]>();
  isAuthenticated = signal(false);

  constructor(private serviceService: ServicesService, private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth)
    });
    this.services$ = this.serviceService.getServices();
  }

  navigateToShop() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/shopguest']);
    }
    else{
      this.router.navigate(["/shop"]);
    }
  }

  navigateToLogin(): void {
      this.authService.loginWithRedirect({
        appState: {
          target: '',
        },
        authorizationParams: {
          prompt: 'login', //other possibilities: https://auth0.github.io/auth0-spa-js/interfaces/AuthorizationParams.html#prompt,
        },
      });
    }
  }
