import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRecharge } from './pay-recharge';

describe('PayRecharge', () => {
  let component: PayRecharge;
  let fixture: ComponentFixture<PayRecharge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayRecharge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRecharge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
