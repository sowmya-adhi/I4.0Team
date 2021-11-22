import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadinessOrgComponent } from './readiness-org.component';

describe('ReadinessOrgComponent', () => {
  let component: ReadinessOrgComponent;
  let fixture: ComponentFixture<ReadinessOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadinessOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadinessOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
