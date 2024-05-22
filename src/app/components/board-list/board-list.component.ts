import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Board } from '../../interfaces/board';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent {
  title = '';
  boards: any = [];

  constructor(private ts: TaskService) {
    this.renderBoards();

  }

  async renderBoards() {
      try {
        this.boards = await this.ts.loadBoards();
      } catch (e) {
        console.log('Help!!', e);
      }
  }

  async createNewBoard() {
    try {
      await this.ts.newBoard({
        title: this.title,
      });
      console.log('Board created successfully!');
    } catch (e) {
      console.log('We have a problem', e)
    }
  }

}
