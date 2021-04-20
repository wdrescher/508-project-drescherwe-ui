import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelAComponent } from './setup-panel-a.component';

describe('SetupPanelAComponent', () => {
  let component: SetupPanelAComponent;
  let fixture: ComponentFixture<SetupPanelAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPanelAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
