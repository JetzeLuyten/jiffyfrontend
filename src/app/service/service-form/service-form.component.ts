import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../../model/service';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../services/service.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateServiceDto } from '../../model/update-service.dto';
import { ServiceType } from '../../model/serviceType';
import { Router } from '@angular/router';
import { ServiceTypeService } from '../../services/service-type.service';
import { AuthService } from '@auth0/auth0-angular';
import { CreateServiceDto } from '../../model/create-service.dto';


@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  serviceId: number = 0;

  service: Service = { 
    id: 0, 
    title: "", 
    serviceTypeId: 0, 
    serviceType: { id: 0, name: ""}, 
    description: "", 
    userId: 0, 
    user: { id: 0, auth0UserId: "", email: "", fullName: ""}, 
    publishDate: "",
    price: 0 
  };

  serviceTypes: ServiceType[] = [];
  isSubmitted: boolean = false;
  errorMessage: string = '';

  service$: Subscription = new Subscription();

  postService$: Subscription = new Subscription();
  putService$: Subscription = new Subscription();
  serviceTypes$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private serviceService: ServicesService,
    private serviceTypeService: ServiceTypeService,
    private auth: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.isAdd = navigation.extras.state['mode'] === 'add';
      this.isEdit = navigation.extras.state['mode'] === 'edit';
      this.serviceId = Number(navigation.extras.state['id']);

      if (!this.isAdd && !this.isEdit) {
        this.isAdd = true;
      }
  
      if (this.serviceId != null && this.serviceId > 0) {
        this.service$ = this.serviceService.getServiceById(this.serviceId).subscribe(result => this.service = result);
      }

      this.serviceTypes$ = this.serviceTypeService.getServiceTypes().subscribe({
        next: (result) => this.serviceTypes = result,
        error: (e) => this.errorMessage = e.message
      });
    }
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.service$.unsubscribe();
    this.postService$.unsubscribe();
    this.putService$.unsubscribe();
    this.serviceTypes$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;

    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        if (this.isAdd) {
          const createServiceDto: CreateServiceDto = {
            title: this.service.title,
            description: this.service.description,
            serviceTypeId: this.service.serviceTypeId,
            userId: user.sub, // Set the user ID
            publishDate: new Date(), // Set the current date and time as the publishing date
            price: this.service.price
          };

          this.postService$ = this.serviceService.createService(createServiceDto).subscribe({
            next: () => this.router.navigateByUrl('/myservices'),
            error: (e) => this.errorMessage = e.message
          });
        }

        if (this.isEdit) {
          const updateServiceDto: UpdateServiceDto = {
            id: this.service.id,
            title: this.service.title,
            description: this.service.description,
            serviceTypeId: this.service.serviceTypeId,
            price: this.service.price
          };

          this.putService$ = this.serviceService.updateService(this.serviceId, updateServiceDto).subscribe({
            next: () => this.router.navigateByUrl('/myservices'),
            error: (e) => this.errorMessage = e.message
          });
        }
      }
    });
  }
}
