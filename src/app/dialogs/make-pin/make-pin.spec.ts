import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePin } from './make-pin';

describe('MakePin', () => {
  let component: MakePin;
  let fixture: ComponentFixture<MakePin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakePin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
