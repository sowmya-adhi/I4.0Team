import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDashboardComponent } from './question-dashboard.component';

describe('QuestionDashboardComponent', () => {
  let component: QuestionDashboardComponent;
  let fixture: ComponentFixture<QuestionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
