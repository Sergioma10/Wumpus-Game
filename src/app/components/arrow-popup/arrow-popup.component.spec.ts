import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowPopupComponent } from './arrow-popup.component';

describe('ArrowPopupComponent', () => {
  let component: ArrowPopupComponent;
  let fixture: ComponentFixture<ArrowPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrowPopupComponent]
    });
    fixture = TestBed.createComponent(ArrowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
