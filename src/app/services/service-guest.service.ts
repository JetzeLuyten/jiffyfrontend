import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Service } from '../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceGuestService {
  private apiUrl = environment.api_url; // Update to the actual API URL

  constructor(private httpClient: HttpClient) { }


  getServices(): Observable<Service[]> {
    console.log("zover")
    return this.httpClient.get<Service[]>(`${this.apiUrl}/service`).pipe(
      catchError(error => {
        // Handle errors
        console.error('Error fetching services:', error);
        return throwError(() => error);
      })
    );
  }
}
