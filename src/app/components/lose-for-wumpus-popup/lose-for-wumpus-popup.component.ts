import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameLogicService } from 'src/app/services/game-logic-service.service';

@Component({
  selector: 'app-lose-for-wumpus-popup',
  templateUrl: './lose-for-wumpus-popup.component.html',
  styleUrls: ['./lose-for-wumpus-popup.component.css']
})
export class LoseForWumpusPopupComponent {

  constructor(public dialogRef: MatDialogRef<LoseForWumpusPopupComponent>, private router: Router, private gls: GameLogicService) {}

  closeModal(): void {
    this.dialogRef.close('closeLoseForWumpusModal');
    this.router.navigate(['/menu']);
    this.gls.restartGameService();
  }


}
