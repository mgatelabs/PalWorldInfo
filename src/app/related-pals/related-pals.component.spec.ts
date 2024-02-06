import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPalsComponent } from './related-pals.component';

describe('RelatedPalsComponent', () => {
  let component: RelatedPalsComponent;
  let fixture: ComponentFixture<RelatedPalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedPalsComponent]
    });
    fixture = TestBed.createComponent(RelatedPalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
