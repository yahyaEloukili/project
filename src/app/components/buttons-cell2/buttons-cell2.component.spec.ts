import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCell2Component } from './buttons-cell2.component';

describe('ButtonsCell2Component', () => {
  let component: ButtonsCell2Component;
  let fixture: ComponentFixture<ButtonsCell2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsCell2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCell2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
