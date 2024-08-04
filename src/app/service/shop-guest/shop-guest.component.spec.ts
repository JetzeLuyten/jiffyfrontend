import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGuestComponent } from './shop-guest.component';

describe('ShopGuestComponent', () => {
  let component: ShopGuestComponent;
  let fixture: ComponentFixture<ShopGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
