import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../../model/service';
import { ServicesService } from '../../services/service.services';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { CreateBooking } from '../../model/create-booking.dto';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent implements OnInit {
  service: Service = { id: 0, title: "", serviceTypeId: 0, serviceType: {id: 0, name: ""}, description: "", publishDate: '', 
  userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, price: 0};
  userId: string | null = null;
  hasActiveBooking: boolean = false;

  @Input() isGuest: boolean = false; // Flag to determine if the view is for a guest
  constructor(
    private servicesService: ServicesService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private bookingService: BookingService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId != null) {
      this.servicesService.getServiceById(+serviceId).subscribe(result => this.service = result);
    }

    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        this.userId = user.sub;
        this.checkActiveBooking();
      }
    });
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }

  bookService(): void {
    // Implement the logic to book the offer
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
    console.log('Service booked!');
  }

  checkActiveBooking() {
    if (this.userId) {
      this.bookingService.getBookingsByUser(this.userId).subscribe(bookings => {
        this.hasActiveBooking = bookings.some(booking => booking.serviceId === this.service.id && !booking.complete);
      });
    }
  }
}
