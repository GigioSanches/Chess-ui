import { HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { verify } from 'node:crypto';

interface Cell {
  name: string | null | undefined;
  color: string | null | undefined; 
  x: number;
  y: number;
}


@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {
  board: Array<Array<Cell>> = []; 
  capturedPieces: Array<Cell> = [];

  currentPosition: Cell | null = null;
  newPosition: Cell | null = null; 

  round: number = 0;
  roundColor: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit chamado'); 
    this.fetchChessBoard();
    this.fetchCapturedPieces();
    this.verifyRoundColor();
  }

  verifyRoundColor(): void {
    if (this.round % 2 === 0) {
      this.roundColor = 'White to move'; 
    }
    else {
      this.roundColor = 'Black to move';
    }
  }

  fetchChessBoard(): void {
    this.http.get<Array<Array<Cell>>>('/api/chessboard').subscribe(data => {
      this.board = data;
      console.log(this.board);
    });
  }

  getPieceImage(cell: Cell): string | null {
  if (cell.name === ' ') {
      return null;
  }
   else
      return `assets/pieces/${cell.color}_${cell.name}.png`;
  }
  
  ExibePosicao(cell: any): void {

    if (!this.currentPosition && cell.name !== ' ') {
      this.currentPosition = cell;
      return;
    }

    if (this.currentPosition && (cell.x !== this.currentPosition.x || cell.y !== this.currentPosition.y)) {
      this.newPosition = cell;
      const move = {
        currentPosition: this.currentPosition,
        newPosition: this.newPosition
      };

      this.currentPosition = null;
      this.newPosition = null;

      this.http.post('/api/Move', move).subscribe({
        next: () => {
          this.fetchChessBoard();
          this.fetchCapturedPieces();
          this.round = this.round + 1;
          this.verifyRoundColor();
        },
        error: (err) => {
          alert('Movimento inválido!');
          console.error('Erro ao enviar objeto:', err);
        }
      });
    }    
  }

  ResetBoard(): void {
    this.http.post('/api/Reset', {}).subscribe({
      next: () => {
        this.fetchChessBoard();
        this.fetchCapturedPieces();
      },
      error: (err) => {
        alert('Erro ao reiniciar o tabuleiro!');
        console.error('Erro ao reiniciar o tabuleiro:', err);
      }
    });
  }

  fetchCapturedPieces(): void {
    this.http.get<any[]>('api/fetchCapturedPieces').subscribe(data=> {
    this.capturedPieces = data;
  });  
  }

  get capturedWhitePieces() {
    return this.capturedPieces?.filter(p => p.color === 'White');
  }

  get capturedBlackPieces() {
  return this.capturedPieces?.filter(p => p.color === 'Black');
  }
}