import { Component, OnDestroy, OnInit } from '@angular/core';
import { Service } from '../../model/service';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../services/service.services';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ServicesComponent } from "../services.component";
import { CommonModule } from '@angular/common';
import { ShortenContentPipe } from '../../shorten-content.pipe';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [ServicesComponent, CommonModule, ShortenContentPipe],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent implements OnInit, OnDestroy {
  services: Service[] = [];
  services$: Subscription = new Subscription();
  deleteService$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private serviceService: ServicesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyServices();
  }

  ngOnDestroy(): void {
    this.services$.unsubscribe();
    this.deleteService$.unsubscribe();
  }

  getMyServices() {
    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        this.services$ = this.serviceService.getServicesByUser(user.sub).subscribe({
          next: (result) => this.services = result,
          error: (e) => this.errorMessage = e.message
        })
      }
    })
  }


  editService(id: number) {
    if (!isNaN(id)) {
      console.log('ID for edit:', id);
      this.router.navigate(['myservices/form'], { state: { id: id, mode: 'edit' } });
    } else {
      console.error('Invalid ID for edit:', id);
    }
  }

  addService() {
    this.router.navigate(['myservices/form'], { state: { mode: 'add' } });
  }

  deleteService(id: number) {
    if (id) {
      this.deleteService$ = this.serviceService.deleteService(id).subscribe({
        next: () => this.getMyServices(),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
}
