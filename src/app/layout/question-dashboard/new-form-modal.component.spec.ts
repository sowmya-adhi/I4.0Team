import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormModalComponent } from './new-form-modal.component';

describe('NewFormModalComponent', () => {
  let component: NewFormModalComponent;
  let fixture: ComponentFixture<NewFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
