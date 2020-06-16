import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateMouvementCellComponent } from './date-mouvement-cell.component';

describe('DateMouvementCellComponent', () => {
  let component: DateMouvementCellComponent;
  let fixture: ComponentFixture<DateMouvementCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateMouvementCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateMouvementCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
