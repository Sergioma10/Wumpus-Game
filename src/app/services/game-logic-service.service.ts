import { Injectable } from '@angular/core';
import { Parameters } from '../interfaces/parameters';
import {BehaviorSubject} from 'rxjs';
import { Square } from '../interfaces/square';
import { TypeSquare } from '../enums/type-square';
import { MatDialog } from '@angular/material/dialog';
import { GoldPopupComponent } from '../components/gold-popup/gold-popup.component';
import { LoseForWumpusPopupComponent } from '../components/lose-for-wumpus-popup/lose-for-wumpus-popup.component';
import { LoseForWellPopupComponent } from '../components/lose-for-well-popup/lose-for-well-popup.component';
import { WinPopupComponent } from '../components/win-popup/win-popup.component';
import { ArrowPopupComponent } from '../components/arrow-popup/arrow-popup.component';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  private _parameters: Parameters = {arrows:0, rows:0, wells:0};
  private _boardObservable: BehaviorSubject<Array<Array<Square>>> = new BehaviorSubject<Array<Array<Square>>>([]);
  private _arrows: BehaviorSubject<number> = new BehaviorSubject<number>(0);;
  private _playerSquareRow: number = 0;
  private _playerSquareCol: number = 0;
  private _hasGold: boolean = false;
  private _isScreenBlock: boolean = false;
  private _lastSquare: Square = {type: TypeSquare.Empty, srcImage: '', visible: false, number: 0, row: 0, col: 0, stench: false, wind: false, leftWall: false, rightWall: false, topWall: false, botWall: false, finishSquare: false};

  constructor(private dialog: MatDialog){}

  get parameters(){
    return this._parameters;
  }

  get boardObservable(){
    return this._boardObservable.asObservable();
  }

  get isScreenBlock(){
    return this._isScreenBlock;
  }

  get arrows(){
    return this._arrows.asObservable();
  }

  startGame(parameters: Parameters){
    this._parameters = {arrows:parameters.arrows, rows:parameters.rows, wells:parameters.wells};
    this._arrows.next(this._parameters.arrows);
    this.createBoard(this._parameters.rows);
  }

  changePlayerSprite(e: any, square: Square){
    if(!square.botWall && this._boardObservable.value[square.row+1][square.col].type == TypeSquare.Player){
      //arriba
      this._boardObservable.value[square.row+1][square.col].srcImage = '../../../assets/imgs/player/topPlayer.png';
      e.target.classList.add("selectedSquare");
    }
    else if(!square.topWall && this._boardObservable.value[square.row-1][square.col].type == TypeSquare.Player){
      //debajo
      this._boardObservable.value[square.row-1][square.col].srcImage = '../../../assets/imgs/player/botPlayer.png';
      e.target.classList.add("selectedSquare");
    }
    else if(!square.rightWall && this._boardObservable.value[square.row][square.col+1].type == TypeSquare.Player){
      //izquierda
      this._boardObservable.value[square.row][square.col+1].srcImage = '../../../assets/imgs/player/leftPlayer.png';
      e.target.classList.add("selectedSquare");
    }
    else if(!square.leftWall && this._boardObservable.value[square.row][square.col-1].type == TypeSquare.Player){
      //derecha
      this._boardObservable.value[square.row][square.col-1].srcImage = '../../../assets/imgs/player/rightPlayer.png';
      e.target.classList.add("selectedSquare");
    }
  }

  movePlayer(e: any, square: Square){
    if(!this.checkIfDeath(square) && !this.checkIfWin(square)){
      this.checkIfGold(square);

      this._boardObservable.value[this._playerSquareRow][this._playerSquareCol] = this._lastSquare;

      this._lastSquare = {type: square.type, srcImage: square.srcImage, visible: square.visible, number: square.number, row: square.row, col: square.col, stench: square.stench, wind: square.wind, leftWall: square.leftWall, rightWall: square.rightWall, topWall: square.topWall, botWall: square.botWall, finishSquare: square.finishSquare};

      this._boardObservable.value[square.row][square.col].type = TypeSquare.Player;
      this._boardObservable.value[square.row][square.col].visible = true;
      this._boardObservable.value[square.row][square.col].srcImage = '../../../assets/imgs/player/rightPlayer.png';

      this._playerSquareCol = square.col;
      this._playerSquareRow = square.row;

      this.checkIfStenchOrWind(square);
    }
  }

  shootArrow(e: any, square: Square){
    this._arrows.next(this._arrows.value - 1);

    const dialogRef = this.dialog.open(ArrowPopupComponent, {
      width: '400px',
      disableClose: true,
    });

    setTimeout(() => {
      dialogRef.close()

      if(square.type == TypeSquare.Wumpus){
        this._isScreenBlock = true;
        square.srcImage = '../../../assets/imgs/wumpus/wumpus.png';
        square.visible = true;
        setTimeout(() => {
          square.srcImage = '../../../assets/imgs/wumpus/wumpusDeath.gif'
  
          setTimeout(() => {
            square.srcImage = '';
            square.visible = false;
    
            setTimeout(() => {
              square.srcImage = '../../../assets/imgs/stone.png'
              square.visible = true;
              square.type = TypeSquare.Empty;
              this._isScreenBlock = false;
            }, 1000);
    
          }, 1200);
  
        }, 2000);
      }

    }, 800);
    
  }

  private putWumpusInBoard(){
    let row = this._parameters.rows-1;
    let col = 0;

    while(row > this._parameters.rows-3 && col < 2){
      row = Math.floor(Math.random() * this.parameters.rows);
      col = Math.floor(Math.random() * this.parameters.rows);
    }

    //put wunpus
    this._boardObservable.value[row][col].type = TypeSquare.Wumpus;
    this._boardObservable.value[row][col].visible = false;

    //put stench
    if(row != this._boardObservable.value.length-1){
      this.putStech(this._boardObservable.value[row+1][col]);
    }
    if(row != 0){
      this.putStech(this._boardObservable.value[row-1][col]);
    }
    if(col != this._boardObservable.value.length-1){
      this.putStech(this._boardObservable.value[row][col+1]);
    }
    if(col != 0){
      this.putStech(this._boardObservable.value[row][col-1]);
    }
  }

  private putStech(square: Square){
    square.srcImage = '../../../assets/imgs/stench.png';
    square.stench = true;
    square.visible = this.isPlayerNear(square);
  }

  private putWellInBoard(){
    let row = this._parameters.rows-1;
    let col = 0;
    let loop = true;

      while(row > this._parameters.rows-3 && col < 2 || loop){
        row = Math.floor(Math.random() * this.parameters.rows);
        col = Math.floor(Math.random() * this.parameters.rows);
        console.log(row+','+col)

        if(this._boardObservable.value[row][col].type == TypeSquare.Empty && !(row > this._parameters.rows - 3 && col < 2)){
          console.log('pozo colocado')
          loop = false;
        }
        else{
          loop = true;
        }
      }

    //put well
    this._boardObservable.value[row][col].type = TypeSquare.Well;
    this._boardObservable.value[row][col].visible = false;

    //put wind
    if(row != this._boardObservable.value.length-1){
      this.putWind(this._boardObservable.value[row+1][col]);
    }
    if(row != 0){
      this.putWind(this._boardObservable.value[row-1][col]);
    }
    if(col != this._boardObservable.value.length-1){
      this.putWind(this._boardObservable.value[row][col+1]);
    }
    if(col != 0){
      this.putWind(this._boardObservable.value[row][col-1]);
    }
  }

  private putWind(square: Square){
    if(square.stench){
      square.srcImage = '../../../assets/imgs/stenchAndWind.png';
    }
    else{
      square.srcImage = '../../../assets/imgs/wind.png';
    }
    square.wind = true;
    square.visible = this.isPlayerNear(square);
  }

  private putGoldInBoard(){
    let row = this._parameters.rows-1;
    let col = 0;
    let loop = true;

      while(row > this._parameters.rows-3 && col < 2 || loop){
        row = Math.floor(Math.random() * this.parameters.rows);
        col = Math.floor(Math.random() * this.parameters.rows);
        console.log(row+','+col)

        if(this._boardObservable.value[row][col].type == TypeSquare.Empty && !(row > this._parameters.rows - 3 && col < 2)){
          console.log('oro colocado')
          loop = false;
        }
        else{
          loop = true;
        }
      }

      //put gold
      this._boardObservable.value[row][col].type = TypeSquare.Gold;
      this._boardObservable.value[row][col].visible = false;
  }

  private isPlayerNear(square: Square): boolean{
    if((!square.botWall && this._boardObservable.value[square.row+1][square.col].type == TypeSquare.Player)
      || (!square.topWall && this._boardObservable.value[square.row-1][square.col].type == TypeSquare.Player)
      || (!square.rightWall && this._boardObservable.value[square.row][square.col+1].type == TypeSquare.Player)
      || (!square.leftWall && this._boardObservable.value[square.row][square.col-1].type == TypeSquare.Player)){
      return true;
    }
    else{
      return false;
    }
  }

  private createBoard(rowNumbers: number){
    let lastNum = 0;
    let board = new Array<Array<Square>>();

    for (let i = 0; i < rowNumbers; i++) {
      let row = []
      for (let j = 0; j < rowNumbers; j++) {
        if(i == rowNumbers-1 && j == 0){
          row.push({type: TypeSquare.Player, srcImage: '../../../assets/imgs/player/rightPlayer.png', visible: true, number: lastNum, row: i, col: j, stench: false, wind: false, leftWall: true, rightWall: false, topWall: false, botWall: true, finishSquare: true});
          this._playerSquareRow = i;
          this._playerSquareCol = j;
          this._lastSquare = {type: TypeSquare.Empty, srcImage: '', visible: false, number: lastNum, row: i, col: j, stench: false, wind: false, leftWall: true, rightWall: false, topWall: false, botWall: true, finishSquare: true}
        }
        else{
          let square: Square = {type: TypeSquare.Empty, srcImage: '', visible: false, number: lastNum, row: i, col: j, stench: false, wind: false, leftWall: false, rightWall: false, topWall: false, botWall: false, finishSquare: false};
          this.checkIfWall(square);
          console.log(square);
          row.push(square);
        }
        lastNum++;
      }
      board.push(row);
    }

    this._boardObservable.next(board);
    this.putWumpusInBoard();
    for (let i = 0; i < this._parameters.wells; i++) {
      this.putWellInBoard();
    }
    this.putGoldInBoard();

    this._boardObservable.value[this._parameters.rows-1][0].srcImage = '../../../assets/imgs/player/rightPlayer.png';
    this._boardObservable.value[this._parameters.rows-1][0].visible = true;
    console.log(this._boardObservable)
  }

  private checkIfWall(square: Square){
    if(square.row == 0){
        square.topWall = true;
    }
    if(square.row == this._parameters.rows-1){
        square.botWall = true;
    }
    if(square.col == 0){
      square.leftWall = true;
    }
    if(square.col == this._parameters.rows-1){
      square.rightWall = true;
    }
  }

  private checkIfStenchOrWind(square: Square){
    if(!square.botWall && (this._boardObservable.value[square.row+1][square.col].stench || this._boardObservable.value[square.row+1][square.col].wind)){
      //arriba
      this._boardObservable.value[square.row+1][square.col].visible = true;
    }
    if(!square.topWall && (this._boardObservable.value[square.row-1][square.col].stench || this._boardObservable.value[square.row-1][square.col].wind)){
      //debajo
      this._boardObservable.value[square.row-1][square.col].visible = true
    }
    if(!square.rightWall && (this._boardObservable.value[square.row][square.col+1].stench || this._boardObservable.value[square.row][square.col+1].wind)){
      //izquierda
      this._boardObservable.value[square.row][square.col+1].visible = true
    }
    if(!square.leftWall && (this._boardObservable.value[square.row][square.col-1].stench || this._boardObservable.value[square.row][square.col-1].wind)){
      //derecha
      this._boardObservable.value[square.row][square.col-1].visible = true
    }
  }

  private checkIfGold(square: Square){
    if(square.type == TypeSquare.Gold){
      const goldModal = this.dialog.open(GoldPopupComponent, {
        width: '600px',
        disableClose: true
      });
      
      goldModal.afterClosed().subscribe(result => {
        if (result === 'cerrarModal') {
          goldModal.close();
        }
      });

      square.type = TypeSquare.Empty;
      this._hasGold = true;
    }
  }

  private checkIfDeath(square: Square): boolean{
    if(square.type == TypeSquare.Wumpus){
      this._isScreenBlock = true;
      square.srcImage = '../../../assets/imgs/wumpus/wumpus.png';
      square.visible = true;
      this._boardObservable.value[this._playerSquareRow][this._playerSquareCol].srcImage = '../../../assets/imgs/player/deathPlayer.png'

      setTimeout(() => {
        const dialogRef = this.dialog.open(LoseForWumpusPopupComponent, {
          width: '400px',
          disableClose: true,
        });
      }, 2000);

      return true;
    }
    else if(square.type == TypeSquare.Well){
      this._isScreenBlock = true;
      square.srcImage = '../../../assets/imgs/well.png';
      square.visible = true;
      this._boardObservable.value[this._playerSquareRow][this._playerSquareCol].srcImage = '../../../assets/imgs/player/deathPlayer.png'

      setTimeout(() => {
        const dialogRef = this.dialog.open(LoseForWellPopupComponent, {
          width: '400px',
          disableClose: true,
        });
      }, 2000);

      return true;
    }
    return false;
  }

  private checkIfWin(square: Square): boolean{
    if(this._hasGold && square.finishSquare){
      this._boardObservable.value[this._playerSquareRow][this._playerSquareCol].visible = false;
      square.srcImage = '../../../assets/imgs/player/leftPlayer.png';
      square.visible = true;

      this._isScreenBlock = true;

      setTimeout(() => {
        const dialogRef = this.dialog.open(WinPopupComponent, {
          width: '400px',
          disableClose: true,
        });
      }, 1000);

      return true;
    }

    return false;
  }

  public restartGameService(){
    this._parameters = {arrows:0, rows:0, wells:0};
    this._boardObservable = new BehaviorSubject<Array<Array<Square>>>([]);
    this._playerSquareRow = 0;
    this._playerSquareCol = 0;
    this._hasGold = false;
    this._isScreenBlock = false;
    this._lastSquare = {type: TypeSquare.Empty, srcImage: '', visible: false, number: 0, row: 0, col: 0, stench: false, wind: false, leftWall: false, rightWall: false, topWall: false, botWall: false, finishSquare: false};
  }

}
