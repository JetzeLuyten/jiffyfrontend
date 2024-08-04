import { Component, Input } from '@angular/core';
import { Service } from '../../model/service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../../shorten-content.pipe';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-service-guest',
  standalone: true,
  imports: [CommonModule, ShortenContentPipe, DateFormatPipe],
  templateUrl: './service-guest.component.html',
  styleUrls: ['./service-guest.component.css']
})
export class ServiceGuestComponent {
  @Input() service: Service = { id: 0, title: "", serviceTypeId: 0, serviceType: { id: 0, name: ""}, description: "", 
  userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: "", price: 0};
  @Input() isDetail: boolean = false;

  constructor(private router: Router) {}

  detail(id: number) {
    this.router.navigate(['/serviceguest', id]);
  }
}