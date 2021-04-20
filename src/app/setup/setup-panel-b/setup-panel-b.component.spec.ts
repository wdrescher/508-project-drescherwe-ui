import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelBComponent } from './setup-panel-b.component';

describe('SetupPanelBComponent', () => {
  let component: SetupPanelBComponent;
  let fixture: ComponentFixture<SetupPanelBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPanelBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
