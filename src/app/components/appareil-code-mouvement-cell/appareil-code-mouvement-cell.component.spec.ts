import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilCodeMouvementCellComponent } from './appareil-code-mouvement-cell.component';

describe('AppareilCodeMouvementCellComponent', () => {
  let component: AppareilCodeMouvementCellComponent;
  let fixture: ComponentFixture<AppareilCodeMouvementCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilCodeMouvementCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilCodeMouvementCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
