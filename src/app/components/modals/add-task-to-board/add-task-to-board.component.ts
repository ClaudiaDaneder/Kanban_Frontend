import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task-to-board',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-task-to-board.component.html',
  styleUrl: './add-task-to-board.component.scss'
})
export class AddTaskToBoardComponent {
  activeModal = inject(NgbActiveModal);
  @Output() newTaskAdded = new EventEmitter<void>();

  boards: any = [];
  users: any = [];
  task: Task = {
    title: '',
    description: '',
    status: 0,
    priority: 0,
    deadline: new Date(),
    board: 0,
    project_lead: 0,
    created_at: new Date()
  };


  constructor(private ts: TaskService, private us: UserService) {
    this.loadBoardTitles();
    this.loadUsers();
  }

  async createTask() {
    try {
      await this.ts.newTask(this.task);
      this.activeModal.close();
      this.newTaskAdded.emit();
    } catch (e) {
      console.log('We have a problem', e)
    }
  }

  loadBoardTitles() {
    this.ts.loadBoards().then(boards => {
      this.boards = boards;
    }).catch(error => {
      console.error('Error loading boards', error);
    });
  }

  loadUsers() {
    this.us.loadUsers().then(users => {
      this.users = users;
    }).catch(error => {
      console.error('Error loading users', error);
    });
  }
}
