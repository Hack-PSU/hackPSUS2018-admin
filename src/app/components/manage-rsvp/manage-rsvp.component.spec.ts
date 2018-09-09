import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRsvpComponent } from './manage-rsvp.component';

describe('ManageRsvpComponent', () => {
  let component: ManageRsvpComponent;
  let fixture: ComponentFixture<ManageRsvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRsvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRsvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
