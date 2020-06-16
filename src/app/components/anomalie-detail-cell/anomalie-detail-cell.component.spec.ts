import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalieDetailCellComponent } from './anomalie-detail-cell.component';

describe('AnomalieDetailCellComponent', () => {
  let component: AnomalieDetailCellComponent;
  let fixture: ComponentFixture<AnomalieDetailCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomalieDetailCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalieDetailCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
