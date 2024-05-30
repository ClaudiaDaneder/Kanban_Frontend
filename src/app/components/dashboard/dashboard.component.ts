import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from '../modals/create-task/create-task.component';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { Board } from '../../interfaces/board';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private modalService = inject(NgbModal);
  private ts = inject(TaskService);
  boards: any = [];
  tasks: any = [];
  nextDeadline: Task | null = null;


  constructor() {
    this.getBoardNumbers();
    this.getAssignedTasks();
  }

  openCreateNewTaskModal() {
    let modalRef = this.modalService.open(CreateTaskComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.newTaskAdded.subscribe(() => {
      this.getAssignedTasks();
    })
  }

  openCreateNewBoardModal() {
    let modalRef = this.modalService.open(CreateBoardComponent, { size: 'm', centered: true });
    modalRef.componentInstance.newBoardAdded.subscribe(() => {
      this.getBoardNumbers();
    })
  }

  async getBoardNumbers() {
    try {
      this.boards = await this.ts.loadBoards();

    } catch (e) {
      console.log('Help!!', e);
    }
  }

  async getAssignedTasks() {
    try {
      const allTasks: any = await this.ts.loadAllUserTasks();
      this.tasks = allTasks.filter((task: { status: number}) => task.status !== 4);
      this.nextDeadline = this.getEarliestDeadline();
    } catch(e) {
      console.log(e);
    }
  }

  getTasksByStatus(status: number): any {
    return this.tasks.filter((task: { status: number; }) => task.status === status);
  }

  getTaskCountByStatus(status: number): number {
    return this.getTasksByStatus(status).length;
  }

  getTaskByPriority(priority: number): any {
    return this.tasks.filter((task: { priority: number }) => task.priority === priority)
  }

  getTaskCountByPriority(priority: number): number {
    return this.getTaskByPriority(priority).length;
  }

  getEarliestDeadline(): Task | null {
    let now = new Date();
    let futureDeadlines = this.tasks.filter((task: { deadline: Date }) => new Date(task.deadline) > now);
    if (futureDeadlines.length === 0) {
      return null;
    }
    futureDeadlines.sort((a: { deadline: Date; }, b: { deadline: Date; }) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    return futureDeadlines[0];
  }
}
