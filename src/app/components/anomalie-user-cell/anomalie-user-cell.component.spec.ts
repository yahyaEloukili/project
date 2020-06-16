import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalieUserCellComponent } from './anomalie-user-cell.component';

describe('AnomalieUserCellComponent', () => {
  let component: AnomalieUserCellComponent;
  let fixture: ComponentFixture<AnomalieUserCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomalieUserCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalieUserCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
