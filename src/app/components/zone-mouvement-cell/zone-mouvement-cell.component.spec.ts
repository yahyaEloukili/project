import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMouvementCellComponent } from './zone-mouvement-cell.component';

describe('ZoneMouvementCellComponent', () => {
  let component: ZoneMouvementCellComponent;
  let fixture: ComponentFixture<ZoneMouvementCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneMouvementCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneMouvementCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
