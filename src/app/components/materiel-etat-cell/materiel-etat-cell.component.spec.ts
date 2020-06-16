import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielEtatCellComponent } from './materiel-etat-cell.component';

describe('MaterielEtatCellComponent', () => {
  let component: MaterielEtatCellComponent;
  let fixture: ComponentFixture<MaterielEtatCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterielEtatCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterielEtatCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
