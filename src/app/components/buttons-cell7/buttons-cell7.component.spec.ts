import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCell7Component } from './buttons-cell7.component';

describe('ButtonsCell7Component', () => {
  let component: ButtonsCell7Component;
  let fixture: ComponentFixture<ButtonsCell7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsCell7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCell7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
