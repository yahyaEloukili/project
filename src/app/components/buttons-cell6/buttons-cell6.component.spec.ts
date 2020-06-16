import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCell6Component } from './buttons-cell6.component';

describe('ButtonsCell6Component', () => {
  let component: ButtonsCell6Component;
  let fixture: ComponentFixture<ButtonsCell6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsCell6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCell6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
