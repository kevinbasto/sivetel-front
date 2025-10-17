import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayService } from './pay-service';

describe('PayService', () => {
  let component: PayService;
  let fixture: ComponentFixture<PayService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
