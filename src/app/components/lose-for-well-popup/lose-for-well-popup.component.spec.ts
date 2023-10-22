import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoseForWellPopupComponent } from './lose-for-well-popup.component';

describe('LoseForWellPopupComponent', () => {
  let component: LoseForWellPopupComponent;
  let fixture: ComponentFixture<LoseForWellPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoseForWellPopupComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(LoseForWellPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
