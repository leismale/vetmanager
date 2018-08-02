import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffcalendarComponent } from './staffcalendar.component';

describe('StaffcalendarComponent', () => {
  let component: StaffcalendarComponent;
  let fixture: ComponentFixture<StaffcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
