import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeService } from './make-service';

describe('MakeService', () => {
  let component: MakeService;
  let fixture: ComponentFixture<MakeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
