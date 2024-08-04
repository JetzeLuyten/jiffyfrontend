import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { UserDto } from '../model/update-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.api_url}/user`;

  constructor(private httpClient: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: string, updates: UserDto): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${userId}`, updates); // Changed PATCH to PUT
  }
}
