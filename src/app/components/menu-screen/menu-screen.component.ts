import { Component } from '@angular/core';
import { GameLogicService } from 'src/app/services/game-logic-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-screen',
  templateUrl: './menu-screen.component.html',
  styleUrls: ['./menu-screen.component.css']
})
export class MenuScreenComponent {

  rowsInput: number = 4;
  arrowsInput: number = 1;
  wellsInput: number = 3;

  constructor(private gls: GameLogicService, private router: Router){
  }

  startGame(){
    this.gls.startGame({rows: this.rowsInput, arrows: this.arrowsInput, wells: this.wellsInput})
    this.router.navigate(['/game']);
  }

}
