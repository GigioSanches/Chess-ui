import { HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cell {
  name: string | null | undefined;
}

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {
  board: Array<Array<Cell>> = []; // Definindo o tipo correto

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit chamado'); // Verifica o conteúdo de 'board'
    this.fetchChessBoard();
  }

  fetchChessBoard(): void {
    this.http.get<Array<Array<Cell>>>('/api/chessboard').subscribe(data => {
      this.board = data;
      console.log(this.board);
    });
  }
}