import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPalsComponent } from './my-pals.component';

describe('MyPalsComponent', () => {
  let component: MyPalsComponent;
  let fixture: ComponentFixture<MyPalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPalsComponent]
    });
    fixture = TestBed.createComponent(MyPalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
