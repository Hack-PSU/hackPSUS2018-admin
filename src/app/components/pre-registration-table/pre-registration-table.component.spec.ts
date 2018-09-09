import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegistrationTableComponent } from './pre-registration-table.component';

describe('PreRegistrationTableComponent', () => {
  let component: PreRegistrationTableComponent;
  let fixture: ComponentFixture<PreRegistrationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRegistrationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRegistrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
