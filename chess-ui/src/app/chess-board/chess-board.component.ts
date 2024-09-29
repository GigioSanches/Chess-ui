import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [HttpClient,Component],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {
  board: string[][] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChessBoard();
  }

  fetchChessBoard(): void {
    this.http.get<string[][]>('http://localhost:8080/api/chessboard').subscribe(data => {
      this.board = data;
    })
  }

}
