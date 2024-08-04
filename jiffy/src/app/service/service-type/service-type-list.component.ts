import { Component } from '@angular/core';
import { ServiceType } from '../../model/serviceType';
import { Subscription } from 'rxjs';
import { ServiceTypeService } from '../../services/service-type.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-type-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-type-list.component.html',
  styleUrl: './service-type-list.component.css'
})
export class CategoryListComponent {
  serviceTypes: ServiceType[] = [];
  categories$: Subscription = new Subscription();
  deleteCategory$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private serviceTypeService: ServiceTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.deleteCategory$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/servicetype/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['admin/servicetype/form'], { state: {id: id, mode: 'edit'} });
  }

  delete(id: number) {
    this.deleteCategory$ = this.serviceTypeService.deleteServiceType(id).subscribe({
      next: (v) => this.getCategories(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getCategories() {
    this.categories$ = this.serviceTypeService.getServiceTypes().subscribe(result => this.serviceTypes = result);
  }
}
