import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoldPopupComponent } from './gold-popup.component';

describe('GoldPopupComponent', () => {
  let component: GoldPopupComponent;
  let fixture: ComponentFixture<GoldPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldPopupComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(GoldPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
