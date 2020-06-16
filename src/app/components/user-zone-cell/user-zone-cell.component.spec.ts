import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserZoneCellComponent } from './user-zone-cell.component';

describe('UserZoneCellComponent', () => {
  let component: UserZoneCellComponent;
  let fixture: ComponentFixture<UserZoneCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserZoneCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserZoneCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
