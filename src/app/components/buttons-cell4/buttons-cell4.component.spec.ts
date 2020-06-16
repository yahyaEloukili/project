import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCell4Component } from './buttons-cell4.component';

describe('ButtonsCell4Component', () => {
  let component: ButtonsCell4Component;
  let fixture: ComponentFixture<ButtonsCell4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsCell4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCell4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
