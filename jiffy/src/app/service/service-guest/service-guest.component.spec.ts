import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGuestComponent } from './service-guest.component';

describe('ServiceGuestComponent', () => {
  let component: ServiceGuestComponent;
  let fixture: ComponentFixture<ServiceGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
