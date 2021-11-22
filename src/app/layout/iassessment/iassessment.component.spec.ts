import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IassessmentComponent } from './iassessment.component';

describe('IassessmentComponent', () => {
  let component: IassessmentComponent;
  let fixture: ComponentFixture<IassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IassessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
