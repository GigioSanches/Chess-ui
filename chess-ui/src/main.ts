import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module'; // Importa as rotas definidas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Aqui fornecemos as rotas para a aplicação
  ]
}).catch(err => console.error(err));