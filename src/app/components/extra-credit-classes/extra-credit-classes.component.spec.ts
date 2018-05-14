import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraCreditClassesComponent } from './extra-credit-classes.component';

describe('ExtraCreditClassesComponent', () => {
  let component: ExtraCreditClassesComponent;
  let fixture: ComponentFixture<ExtraCreditClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraCreditClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraCreditClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
