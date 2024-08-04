import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailGuestComponent } from './service-detail-guest.component';

describe('ServiceDetailGuestComponent', () => {
  let component: ServiceDetailGuestComponent;
  let fixture: ComponentFixture<ServiceDetailGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetailGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceDetailGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
