import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoseForWumpusPopupComponent } from './lose-for-wumpus-popup.component';

describe('LoseForWumpusPopupComponent', () => {
  let component: LoseForWumpusPopupComponent;
  let fixture: ComponentFixture<LoseForWumpusPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoseForWumpusPopupComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(LoseForWumpusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
