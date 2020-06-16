import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilSouEquipementComponent } from './appareil-sou-equipement.component';

describe('AppareilSouEquipementComponent', () => {
  let component: AppareilSouEquipementComponent;
  let fixture: ComponentFixture<AppareilSouEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilSouEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilSouEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
