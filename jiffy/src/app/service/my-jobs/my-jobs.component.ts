import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../model/booking';
import { CommonModule } from '@angular/common';
import { ShortenContentPipe } from '../../shorten-content.pipe';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, ShortenContentPipe, DateFormatPipe],
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
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
      this.bookingService.getJobsByUser(this.userId).subscribe(bookings => {
        this.bookings = bookings;
      });
    }
  }

  markAsComplete(bookingId: number): void {
    this.bookingService.completeBooking(bookingId).subscribe(() => {
      // Remove the completed booking from the view
      this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
    });
  }
}