import { HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  currentPosition: Cell | null = null;
  newPosition: Cell | null = null; 


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit chamado'); 
    this.fetchChessBoard();
  }

  fetchChessBoard(): void {
    this.http.get<Array<Array<Cell>>>('/api/chessboard').subscribe(data => {
      this.board = data;
      console.log(this.board);
    });
  }

  ExibePosicao(cell: any): void {
    
    const piece = {
      name: cell.name,
      color: cell.color,
      x: cell.x,
      y: cell.y
    }

    if (!this.currentPosition) {
      this.currentPosition = cell;
    }
    else {
      this.newPosition = cell;
      const move = {
        currentPosition: this.currentPosition,
        newPosition: this.newPosition
      }

      this.currentPosition = null;
      this.newPosition = null;

      this.http.post('/api/ExibePosicao', move).subscribe({
        next: () => console.log('Objeto enviado ao backend:', piece),
        error: (err) => console.error('Erro ao enviar objeto:', err)
      });
    };

  }
}