import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousEquipementsOfAppareilComponent } from './sous-equipements-of-appareil.component';

describe('SousEquipementsOfAppareilComponent', () => {
  let component: SousEquipementsOfAppareilComponent;
  let fixture: ComponentFixture<SousEquipementsOfAppareilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousEquipementsOfAppareilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousEquipementsOfAppareilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
