import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Service } from '../../model/service';
import { ServiceGuestService } from '../../services/service-guest.service';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { ServicesService } from '../../services/service.services';

@Component({
  selector: 'app-service-detail-guest',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './service-detail-guest.component.html',
  styleUrls: ['./service-detail-guest.component.css']
})
export class ServiceDetailGuestComponent implements OnInit {
  service: Service = { id: 0, title: "", serviceTypeId: 0, serviceType: { id: 0, name: ""}, description: "", 
  userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: "", price: 0};

  @Input() isGuest: boolean = false; // Flag to determine if the view is for a guest
  
  constructor(private serviceService: ServicesService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId != null) {
      this.serviceService.getServiceById(+serviceId).subscribe(result => this.service = result);
    }
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }
}