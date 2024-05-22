import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { Board } from '../../interfaces/board';

@Component({
  selector: 'app-board-details',
  standalone: true,
  imports: [],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.scss'
})
export class BoardDetailsComponent {
  tasks: any = [];


  constructor(private ts: TaskService) {
    this.renderTasks();
  }

  async renderTasks() {
    try {
      this.tasks = await this.ts.loadTasks(1);
    } catch (e) {
      console.log(e);

    }
  }
}
