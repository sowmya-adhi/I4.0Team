import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpigraphsComponent } from './kpigraphs.component';

describe('KpigraphsComponent', () => {
  let component: KpigraphsComponent;
  let fixture: ComponentFixture<KpigraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpigraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpigraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
