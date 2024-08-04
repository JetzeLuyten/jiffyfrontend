import { RouterModule, Routes } from '@angular/router';
import { ServiceShopComponent } from './service/service-shop/service-shop.component';
import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CategoryFormComponent } from './service/service-type-form/service-type-form.component';
import { CategoryListComponent } from './service/service-type/service-type-list.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ServiceDetailComponent } from './service/service-detail/service-detail.component';
import { adminGuard } from './admin.guard';
import { ServiceFormComponent } from './service/service-form/service-form.component';
import { MyServicesComponent } from './service/my-services/my-services.component';
import { MyBookingsComponent } from './service/my-bookings/my-bookings.component';
import { MyJobsComponent } from './service/my-jobs/my-jobs.component';
import { ShopGuestComponent } from './service/shop-guest/shop-guest.component';
import { ServiceDetailGuestComponent } from './service/service-detail-guest/service-detail-guest.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServiceShopComponent },
    { path: 'services/:id', component: ServiceDetailComponent },
    { path: 'serviceguest/:id', component: ServiceDetailGuestComponent },

    { path: 'admin/servicetype', component: CategoryListComponent, canActivate: [AuthGuard, adminGuard]},
    { path: 'admin/servicetype/form', component: CategoryFormComponent, canActivate: [AuthGuard, adminGuard]},

    { path: 'shop', component: ServiceShopComponent },
    { path: 'shopguest', component: ShopGuestComponent },
    { path: 'myservices', component: MyServicesComponent },

    { path: 'myservices/form', component: ServiceFormComponent },

    // Booked Offers and Offers Booked
    { path: 'mybookings', component: MyBookingsComponent },
    { path: 'myjobs', component: MyJobsComponent },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }