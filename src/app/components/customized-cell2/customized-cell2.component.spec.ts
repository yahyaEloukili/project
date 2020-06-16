import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedCell2Component } from './customized-cell2.component';

describe('CustomizedCell2Component', () => {
  let component: CustomizedCell2Component;
  let fixture: ComponentFixture<CustomizedCell2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedCell2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedCell2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
