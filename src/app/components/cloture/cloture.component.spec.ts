import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotureComponent } from './cloture.component';

describe('ClotureComponent', () => {
  let component: ClotureComponent;
  let fixture: ComponentFixture<ClotureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClotureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
