import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionselectionComponent } from './questionselection.component';

describe('QuestionselectionComponent', () => {
  let component: QuestionselectionComponent;
  let fixture: ComponentFixture<QuestionselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionselectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
