import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanBreedComponent } from './can-breed.component';

describe('CanBreedComponent', () => {
  let component: CanBreedComponent;
  let fixture: ComponentFixture<CanBreedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanBreedComponent]
    });
    fixture = TestBed.createComponent(CanBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
