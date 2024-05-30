import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Board } from '../../../interfaces/board';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

  activeModal = inject(NgbActiveModal);
  ts = inject(TaskService);
  us = inject(UserService);
  @Output() taskUpdated = new EventEmitter<void>();

  taskId!: number;
  task!: Task;
  isEditMode: boolean = false;
  boards: any = [];
  users: any = [];


  constructor() {
    this.loadTaskDetails();
    this.loadBoardTitles();
    this.loadUsers();
  }

  async loadTaskDetails() {
    this.taskId = this.ts.taskId;
    try {
      this.task = await this.ts.loadTaskDetails(this.taskId);

    } catch (e) {
      console.log('An error occurred, please help me: ', e);

    }
  }

  async deleteTask() {
    try {
      await this.ts.deleteTask(this.taskId);
      this.activeModal.close();
      this.taskUpdated.emit();

    } catch (e) {
      console.log(e);
    }
  }

  async updateTask() {
    try {
      await this.ts.updateTask(this.taskId, this.task);
      this.isEditMode = false;
      this.taskUpdated.emit();
    } catch (e) {
      console.log('Halt, jetzt stopp!', e);

    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  async loadBoardTitles() {
    try {
      this.boards = await this.ts.loadBoards()
    } catch (error) {
      console.error('Error loading boards', error);
    };
  }

  async loadUsers() {
    try {
      this.users = await this.us.loadUsers()
    } catch (error) {
      console.error('Error loading users', error);
    };
  }

  getBoardTitle(boardId: number): string {
    let board = this.boards.find((b: Board) => b.id === boardId);
    return board ? board.title : 'Unknown';
  }

  getPriorityText(priority: number): string {
    let priorities: any = { 1: 'Low', 2: 'Medium', 3: 'Urgent' };
    return priorities[priority];
  }

  getStatusText(status: number): string {
    let statuses: any = { 1: 'To Do', 2: 'Do Today', 3: 'In Progress', 4: 'Done' };
    return statuses[status];
  }

  getUserName(userId: number) {
    let user = this.users.find((user: User) => user.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : 'Unknown';
  }
}
