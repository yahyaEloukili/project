import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalieDetailComponent } from './anomalie-detail.component';

describe('AnomalieDetailComponent', () => {
  let component: AnomalieDetailComponent;
  let fixture: ComponentFixture<AnomalieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomalieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
