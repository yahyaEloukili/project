import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCell5Component } from './buttons-cell5.component';

describe('ButtonsCell5Component', () => {
  let component: ButtonsCell5Component;
  let fixture: ComponentFixture<ButtonsCell5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsCell5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCell5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
