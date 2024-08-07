import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Service } from '../model/service';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';
import { DateFormatPipe } from '../date-format.pipe';
import { AuthService } from '@auth0/auth0-angular';
import { LoginComponent } from "../auth0/login/login.component";
import { BookingService } from '../services/booking.service';
import { CreateBooking } from '../model/create-booking.dto';
import { ServicesService } from '../services/service.services';

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

  @Output() serviceDeleted = new EventEmitter<number>();

  mailText: string = "";

  isAuthenticated: boolean = false;

  constructor(private router: Router, private location: Location, private auth: AuthService, private bookingService: BookingService, private servicesService: ServicesService) { }

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
    if (id) {
      this.servicesService.deleteService(id).subscribe(() => {
        console.log('Offer deleted successfully');
        this.serviceDeleted.emit(id);
      });
    }
  }

  checkActiveBooking() {
    if (this.userId) {
      this.bookingService.getBookingsByUser(this.userId).subscribe(bookings => {
        this.hasActiveBooking = bookings.some(booking => booking.serviceId === this.service.id && !booking.complete);
      });
    }
  }
}
