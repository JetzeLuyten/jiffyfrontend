import { Component } from '@angular/core';
import { Service } from '../../model/service';
import { ServicesService } from '../../services/service.services';
import { ServicesComponent } from '../services.component';
import { CommonModule } from '@angular/common';
import { catchError, of, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ServiceType } from '../../model/serviceType';
import { AuthService } from '@auth0/auth0-angular';
import { ServiceTypeService } from '../../services/service-type.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-shop',
  standalone: true,
  imports: [CommonModule, ServicesComponent, RouterModule, FormsModule],
  templateUrl: './service-shop.component.html',
  styleUrl: './service-shop.component.css'
})
export class ServiceShopComponent {
  services: Service[] = [];
  filteredServices: Service[] = [];
  services$: Subscription = new Subscription();
  serviceTypes: ServiceType[] = [];
  errorMessage: string = '';
  titleFilter: string = '';
  serviceTypeFilter: string = '';
  userId: string | null = null;

  constructor(
    private serviceService: ServicesService, 
    private serviceTypeService: ServiceTypeService, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch services regardless of the authentication status
    this.serviceService.getServices().pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching services';
        return of([]); // Return an empty array on error
      })
    ).subscribe(result => {
      // If a user is authenticated, filter out services by the currently logged-in user
      this.authService.user$.subscribe(user => {
        this.userId = user?.sub || null;
  
        // Apply filtering based on user authentication status
        this.services = this.userId ? result.filter(service => service.user.auth0UserId !== this.userId) : result;
        this.filteredServices = this.services;
      });
    });
  
    // Fetch service types regardless of the authentication status
    this.getServiceTypes();
  }

  ngOnDestroy(): void {
    this.services$.unsubscribe();
  }
  
  getServiceTypes() {
    this.serviceTypeService.getServiceTypes().subscribe({
      next: (result) => this.serviceTypes = result,
      error: (e) => this.errorMessage = e.message
    });
  }

  applyFilters() {
    this.filteredServices = this.services.filter(service =>
      (this.titleFilter ? service.title.toLowerCase().includes(this.titleFilter.toLowerCase()) : true) &&
      (this.serviceTypeFilter ? service.serviceTypeId === +this.serviceTypeFilter : true)
    );
  }

  detail(id: number) {
    this.router.navigate(['/service', id], { queryParams: {isGuest: true}});
  }
}
