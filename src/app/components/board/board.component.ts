import { Component, ElementRef } from '@angular/core';
import { Square } from 'src/app/interfaces/square';
import { GameLogicService } from '../../services/game-logic-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  board: Array<Array<Square>> = [];
  arrows: number = 0;

  constructor(private gls: GameLogicService, private elementRef: ElementRef){
    gls.boardObservable.subscribe(val => {
      this.board=val;
    });
    gls.arrows.subscribe(val => {
      this.arrows=val;
    });
  }

  clickSquare(e: any, square: Square){
    if(!this.gls.isScreenBlock && e.target.classList.contains('selectedSquare')){
      this.gls.movePlayer(e, square);
    }
  }

  selectedSquare(e: any, square: Square){
    if(!this.gls.isScreenBlock){
      this.gls.changePlayerSprite(e, square);
    }
  }

  unselectedSquare(e: any){
    if(!this.gls.isScreenBlock){
      e.target.classList.remove("selectedSquare");
    }
  }

  rightClick(e: any, square: Square){
    e.preventDefault();

    if(this.arrows > 0 && e.target.classList.contains('selectedSquare')){
        this.gls.shootArrow(e, square);
    }
  }
}
