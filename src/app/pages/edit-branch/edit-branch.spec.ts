import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBranch } from './edit-branch';

describe('EditBranch', () => {
  let component: EditBranch;
  let fixture: ComponentFixture<EditBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
