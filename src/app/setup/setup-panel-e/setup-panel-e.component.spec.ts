import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelEComponent } from './setup-panel-e.component';

describe('SetupPanelEComponent', () => {
  let component: SetupPanelEComponent;
  let fixture: ComponentFixture<SetupPanelEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPanelEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
