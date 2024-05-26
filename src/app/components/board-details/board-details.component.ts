import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskToBoardComponent } from '../modals/add-task-to-board/add-task-to-board.component';
import { TaskDetailsComponent } from '../modals/task-details/task-details.component';

@Component({
  selector: 'app-board-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.scss'
})
export class BoardDetailsComponent {
  tasks: any = [];
  board: any;
  private modalService = inject(NgbModal);


  constructor(private ts: TaskService, private route: ActivatedRoute) {
    this.renderBoardDetails();
  }


  async loadTasks(boardId: number) {
    try {
      this.tasks = await this.ts.loadTaskList(boardId);
    } catch (e) {
      console.log(e);

    }
  }

  async loadBoardTitle(boardId: number) {
    try {
      let boards: any = await this.ts.loadBoards();
      this.board = boards.find((board: any) => board.id == boardId)
    } catch (e) {
      console.log('HEEEELP', e);

    }
  }

  renderBoardDetails() {
    this.route.params.subscribe(params => {
      let boardId = +params['id']; // + konvertiert den String in eine Zahl
      this.loadTasks(boardId);
      this.loadBoardTitle(boardId);
    });
  }

  openAddTaskModal(status: number) {
    let modalRef = this.modalService.open(AddTaskToBoardComponent);
    modalRef.componentInstance.task.status = status;
    modalRef.componentInstance.task.board = this.board.id;
    modalRef.componentInstance.newTaskAdded.subscribe(() => {
      this.loadTasks(this.board.id);
    })
  }

  openTaskDetailModal(taskId: number) {
    let modalRef = this.modalService.open(TaskDetailsComponent);
    modalRef.componentInstance.taskId = taskId;
  }

}
