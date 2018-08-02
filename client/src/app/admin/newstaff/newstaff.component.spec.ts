import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstaffComponent } from './newstaff.component';

describe('NewstaffComponent', () => {
  let component: NewstaffComponent;
  let fixture: ComponentFixture<NewstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
