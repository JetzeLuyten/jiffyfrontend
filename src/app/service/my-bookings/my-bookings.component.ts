import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../model/booking';
import { DateFormatPipe } from '../../date-format.pipe';
import { CommonModule } from '@angular/common';
import { ShortenContentPipe } from '../../shorten-content.pipe';

@Component({
  standalone: true,
  imports: [DateFormatPipe, CommonModule, ShortenContentPipe],
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  userId: string | null = null;

  constructor(private authService: AuthService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user?.sub) {
        this.userId = user.sub;
        this.loadBookings();
      }
    });
  }

  loadBookings(): void {
    if (this.userId) {
      this.bookingService.getBookingsByUser(this.userId).subscribe(bookings => {
        this.bookings = bookings;
        // Ensure completed bookings are at the bottom
        this.bookings.sort((a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1));
      });
    }
  }

  cancelBooking(bookingId: number): void {
    this.bookingService.deleteBooking(bookingId).subscribe(() => {
      console.log('Booking canceled');
      this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
    });
  }
}