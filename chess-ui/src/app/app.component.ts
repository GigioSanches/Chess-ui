import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from './app-routing.module'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet> <!-- O componente ChessBoard será renderizado aqui -->
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chess-ui';
}
