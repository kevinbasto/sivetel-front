import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPin } from './pay-pin';

describe('PayPin', () => {
  let component: PayPin;
  let fixture: ComponentFixture<PayPin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayPin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayPin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
