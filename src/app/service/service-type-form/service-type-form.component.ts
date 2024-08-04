import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceType } from '../../model/serviceType';
import { ServiceTypeService } from '../../services/service-type.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-type-form',
  templateUrl: './service-type-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./service-type-form.component.css']
})

export class CategoryFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  serviceTypeId: number = 0;

  serviceType: ServiceType = { id: 0, name: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  service$: Subscription = new Subscription();
  postServiceType$: Subscription = new Subscription();
  putServiceType$: Subscription = new Subscription();

  constructor(private router: Router, private serviceTypeService: ServiceTypeService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.serviceTypeId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.serviceTypeId != null && this.serviceTypeId > 0) {
      this.service$ = this.serviceTypeService.getServiceTypeById(this.serviceTypeId).subscribe(result => this.serviceType = result);
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.service$.unsubscribe();
    this.postServiceType$.unsubscribe();
    this.putServiceType$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postServiceType$ = this.serviceTypeService.postServiceType(this.serviceType).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/servicetype"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putServiceType$ = this.serviceTypeService.putServiceType(this.serviceTypeId, this.serviceType).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/servicetype"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
  
}
