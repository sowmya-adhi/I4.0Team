import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tier1admindashboardComponent } from './tier1admindashboard.component';

describe('Tier1admindashboardComponent', () => {
  let component: Tier1admindashboardComponent;
  let fixture: ComponentFixture<Tier1admindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tier1admindashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tier1admindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
