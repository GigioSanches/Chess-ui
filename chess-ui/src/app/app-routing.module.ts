import { Routes, RouterModule } from '@angular/router';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { provideRouter } from '@angular/router'; 

export const routes: Routes = [
  { path: 'chessboard', component: ChessBoardComponent },
  { path: '', redirectTo: '/chessboard', pathMatch: 'full' }
];