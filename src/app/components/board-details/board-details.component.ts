import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskToBoardComponent } from '../modals/add-task-to-board/add-task-to-board.component';
import { TaskDetailsComponent } from '../modals/task-details/task-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbDropdownModule, DragDropModule, FormsModule],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.scss'
})
export class BoardDetailsComponent {
  tasks: any = [];
  board: any;
  isEditMode: boolean = false;
  boardId!: number;

  private modalService = inject(NgbModal);
  private ts = inject(TaskService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)


  constructor() {
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
    let modalRef = this.modalService.open(AddTaskToBoardComponent, { centered: true });
    modalRef.componentInstance.task.status = status;
    modalRef.componentInstance.task.board = this.board.id;
    modalRef.componentInstance.newTaskAdded.subscribe(() => {
      this.loadTasks(this.board.id);
    })
  }

  openTaskDetailModal(taskId: number) {
    this.ts.taskId = taskId;
    let modalRef = this.modalService.open(TaskDetailsComponent, { centered: true });
    modalRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadTasks(this.board.id);
    })
  }

  async deleteBoard(boardId: number) {
    try {
      await this.ts.deleteBoard(boardId);
      this.router.navigateByUrl('dashboard');
    } catch (e) {
      console.log(e);
    }
  }

  async updateBoard() {
    try {
      await this.ts.updateBoard(this.board.id, {
        title: this.board.title,
      });
      this.isEditMode = false;
    } catch (e) {
      console.log('Halt, jetzt stopp!', e);

    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

}
