import { Component } from '@angular/core';
import { Service } from '../../model/service';
import { ServiceType } from '../../model/serviceType';
import { ServiceGuestService } from '../../services/service-guest.service';
import { ServiceTypeService } from '../../services/service-type.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceGuestComponent } from '../service-guest/service-guest.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-guest',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceGuestComponent, FormsModule],
  templateUrl: './shop-guest.component.html',
  styleUrl: './shop-guest.component.css'
})
export class ShopGuestComponent {
  services: Service[] = [];
  filteredServices: Service[] = [];
  serviceTypes: ServiceType[] = [];
  errorMessage: string = '';
  titleFilter: string = '';
  serviceTypeFilter: string = '';

  constructor(
    private serviceService: ServiceGuestService,
    private serviceTypeService: ServiceTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe({
      next: (result) => {
        this.services = result;
        this.filteredServices = this.services;
      },
      error: (e) => this.errorMessage = e.message
    });

    this.getServiceTypes();
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
    this.router.navigate(['/serviceguest', id], { queryParams: {isGuest: true}});
  }
}
