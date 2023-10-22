import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GoldPopupComponent } from './components/gold-popup/gold-popup.component';
import { LoseForWumpusPopupComponent } from './components/lose-for-wumpus-popup/lose-for-wumpus-popup.component';
import { LoseForWellPopupComponent } from './components/lose-for-well-popup/lose-for-well-popup.component';
import { WinPopupComponent } from './components/win-popup/win-popup.component';
import { MenuScreenComponent } from './components/menu-screen/menu-screen.component';
import { FormsModule } from '@angular/forms';
import { ArrowPopupComponent } from './components/arrow-popup/arrow-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GoldPopupComponent,
    LoseForWumpusPopupComponent,
    LoseForWellPopupComponent,
    WinPopupComponent,
    MenuScreenComponent,
    ArrowPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
