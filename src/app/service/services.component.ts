import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Service } from '../model/service';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';
import { DateFormatPipe } from '../date-format.pipe';
import { AuthService } from '@auth0/auth0-angular';
import { LoginComponent } from "../auth0/login/login.component";
import { BookingService } from '../services/booking.service';
import { CreateBooking } from '../model/create-booking.dto';
import { ServicesService } from '../services/service.services';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ShortenContentPipe, DateFormatPipe, LoginComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  @Input() service: Service = { id: 0, title: "", serviceTypeId: 0, serviceType: {id: 0, name: ""}, description: "", userId: 0, 
  user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: "", price: 0  };
  @Input() isDetail: boolean = false;
  @Input() isShop: boolean = false;
  userId: string | null = null;
  hasActiveBooking: boolean = false;

  isAuthenticated: boolean = false;

  isAdmin = signal(false);

  constructor(
    private router: Router, 
    private location: Location, 
    private auth: AuthService, 
    private bookingService: BookingService, 
    private servicesService: ServicesService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        this.userId = user.sub;
        this.checkActiveBooking();
      }
    });

    this.roleService.hasPermission('delete:servicetype').subscribe(r => {
      this.isAdmin.set(r);
    });
  }

  detail(id: number) {
    if (this.isAuthenticated) {
      this.router.navigate(["/services", id]);
    }
    else{
      this.auth.loginWithRedirect();
    }
    
  }

  goBack() {
    this.location.back();
  }

  bookService() {
    if (this.userId) {
      const bookingTime = new Date();

      const bookingDto: CreateBooking = {
        bookerAuthId: this.userId,
        serviceId: this.service.id,
        bookingTime: bookingTime,
        completed: false
      };

      this.bookingService.createBooking(bookingDto).subscribe(() => {
        console.log('Booking created successfully');
        this.hasActiveBooking = true;
      });

    }
  }

  deleteService(id: number) {
    this.servicesService.deleteService(id).subscribe(
      () => {
        // Handle success (e.g., remove the item from the local list)
        console.log('Service deleted successfully');
      },
      error => {
        // Handle error
        console.error('Error deleting service', error);
      }
    );
  }

  checkActiveBooking() {
    if (this.userId) {
      this.bookingService.getBookingsByUser(this.userId).subscribe(bookings => {
        this.hasActiveBooking = bookings.some(booking => booking.serviceId === this.service.id && !booking.complete);
      });
    }
  }
}
