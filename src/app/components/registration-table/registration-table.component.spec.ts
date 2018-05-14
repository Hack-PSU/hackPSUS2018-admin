import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTableComponent } from './registration-table.component';

describe('RegistrationTableComponent', () => {
  let component: RegistrationTableComponent;
  let fixture: ComponentFixture<RegistrationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
