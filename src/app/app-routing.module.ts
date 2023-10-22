import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuScreenComponent } from './components/menu-screen/menu-screen.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' }, // Ruta de inicio
  { path: 'menu', component: MenuScreenComponent },
  { path: 'game', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
