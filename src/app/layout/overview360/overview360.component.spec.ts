import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview360Component } from './overview360.component';

describe('Overview360Component', () => {
  let component: Overview360Component;
  let fixture: ComponentFixture<Overview360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview360Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
