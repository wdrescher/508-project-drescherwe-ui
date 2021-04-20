import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelCComponent } from './setup-panel-c.component';

describe('SetupPanelCComponent', () => {
  let component: SetupPanelCComponent;
  let fixture: ComponentFixture<SetupPanelCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPanelCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
