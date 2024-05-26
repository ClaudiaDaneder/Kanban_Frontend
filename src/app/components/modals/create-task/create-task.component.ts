import { TaskService } from '../../../services/task.service';
import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../../interfaces/task';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  activeModal = inject(NgbActiveModal);
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
      await this.ts.newTask(this.task)
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
