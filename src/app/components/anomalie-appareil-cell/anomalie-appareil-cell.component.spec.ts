import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalieAppareilCellComponent } from './anomalie-appareil-cell.component';

describe('AnomalieAppareilCellComponent', () => {
  let component: AnomalieAppareilCellComponent;
  let fixture: ComponentFixture<AnomalieAppareilCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomalieAppareilCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalieAppareilCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
