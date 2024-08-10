import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { Service } from '../model/service';
import { environment } from '../../environments/environment.development';
import { AuthServices } from './auth.service';
import { AuthService } from '@auth0/auth0-angular';
import { UpdateServiceDto } from '../model/update-service.dto';
import { CreateServiceDto } from '../model/create-service.dto';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = environment.api_url; // Update to the actual API URL

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  createService(service: CreateServiceDto): Observable<Service> {
    return this.auth.user$.pipe(
      switchMap(user => {
        const userId = user?.sub;
        return this.httpClient.post<Service>(this.apiUrl + "/service", service );
      })
    );
  }

  getServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${this.apiUrl}/service`);
  }

  getServiceById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(`${this.apiUrl}/service/${id}`);
  }

  getServicesByUser(userId: string): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${this.apiUrl}/service/user/${userId}`);
  }

  updateService(id: number, service: UpdateServiceDto): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/service/${id}`, service);
  }

  deleteService(id: number): Observable<void> {
    console.log(id);
    return this.httpClient.delete<void>(`${this.apiUrl}/service/${id}`);
  }
}
