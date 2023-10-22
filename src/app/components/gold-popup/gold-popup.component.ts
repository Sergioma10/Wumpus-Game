import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-gold-popup',
  templateUrl: './gold-popup.component.html',
  styleUrls: ['./gold-popup.component.css']
})
export class GoldPopupComponent {

  constructor(public dialogRef: MatDialogRef<GoldPopupComponent>) {}

  closeModal(): void {
    this.dialogRef.close('closeGoldModal');
  }

}
