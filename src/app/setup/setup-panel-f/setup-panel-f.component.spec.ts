import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelFComponent } from './setup-panel-f.component';

describe('SetupPanelFComponent', () => {
  let component: SetupPanelFComponent;
  let fixture: ComponentFixture<SetupPanelFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPanelFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
