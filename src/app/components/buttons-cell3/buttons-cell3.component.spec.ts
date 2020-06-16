import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCell3Component } from './buttons-cell3.component';

describe('ButtonsCell3Component', () => {
  let component: ButtonsCell3Component;
  let fixture: ComponentFixture<ButtonsCell3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsCell3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCell3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
