import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedCell3Component } from './customized-cell3.component';

describe('CustomizedCell3Component', () => {
  let component: CustomizedCell3Component;
  let fixture: ComponentFixture<CustomizedCell3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedCell3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedCell3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
