import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRecharge } from './make-recharge';

describe('MakeRecharge', () => {
  let component: MakeRecharge;
  let fixture: ComponentFixture<MakeRecharge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeRecharge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeRecharge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
