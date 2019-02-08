import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHackathonComponent } from './manage-hackathon.component';

describe('ManageHackathonComponent', () => {
  let component: ManageHackathonComponent;
  let fixture: ComponentFixture<ManageHackathonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHackathonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHackathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
