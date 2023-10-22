import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WinPopupComponent } from './win-popup.component';

describe('WinPopupComponent', () => {
  let component: WinPopupComponent;
  let fixture: ComponentFixture<WinPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinPopupComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(WinPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
