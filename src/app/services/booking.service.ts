import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { environment } from '../../environments/environment';
import { CreateBooking } from '../model/create-booking.dto';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.api_url; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getBookingsByUser(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking/user/${userId}`);
  }

  getJobsByUser(authId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking/myjobs/${authId}`);
  }

  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/booking/${bookingId}`);
  }

  // Mark booking as complete
  completeBooking(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/booking/${id}/complete`, {});
  }

  createBooking(createBookingDto: CreateBooking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/booking`, createBookingDto);
  }
}