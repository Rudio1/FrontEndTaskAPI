import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, KanbanBoardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ListaDeTarefasAngular';
}
