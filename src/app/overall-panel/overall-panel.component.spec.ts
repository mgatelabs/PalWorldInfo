import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPanelComponent } from './overall-panel.component';

describe('OverallPanelComponent', () => {
  let component: OverallPanelComponent;
  let fixture: ComponentFixture<OverallPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverallPanelComponent]
    });
    fixture = TestBed.createComponent(OverallPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
