import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameLogicService } from 'src/app/services/game-logic-service.service';

@Component({
  selector: 'app-win-popup',
  templateUrl: './win-popup.component.html',
  styleUrls: ['./win-popup.component.css']
})
export class WinPopupComponent {

  constructor(public dialogRef: MatDialogRef<WinPopupComponent>, private router: Router, private gls: GameLogicService) {}

  closeModal(): void {
    this.dialogRef.close('closeWinModal');
    this.router.navigate(['/menu']);
    this.gls.restartGameService();
  }


}
