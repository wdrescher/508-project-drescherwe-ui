import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelDComponent } from './setup-panel-d.component';

describe('SetupPanelDComponent', () => {
  let component: SetupPanelDComponent;
  let fixture: ComponentFixture<SetupPanelDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPanelDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
