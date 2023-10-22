import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameLogicService } from 'src/app/services/game-logic-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lose-for-well-popup',
  templateUrl: './lose-for-well-popup.component.html',
  styleUrls: ['./lose-for-well-popup.component.css']
})
export class LoseForWellPopupComponent {

  constructor(public dialogRef: MatDialogRef<LoseForWellPopupComponent>, private gls: GameLogicService, private router: Router) {}

  closeModal(): void {
    this.dialogRef.close('closeLoseForWellModal');
    this.router.navigate(['/menu']);
    this.gls.restartGameService();
  }


}
