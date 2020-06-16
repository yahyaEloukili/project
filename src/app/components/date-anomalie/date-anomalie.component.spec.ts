import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAnomalieComponent } from './date-anomalie.component';

describe('DateAnomalieComponent', () => {
  let component: DateAnomalieComponent;
  let fixture: ComponentFixture<DateAnomalieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateAnomalieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAnomalieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
