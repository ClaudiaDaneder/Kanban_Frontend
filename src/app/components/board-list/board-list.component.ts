import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Board } from '../../interfaces/board';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent {
  boards: any = [];
  private modalService = inject(NgbModal);

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

  open() {
    this.modalService.open(CreateBoardComponent, { size: 'lg' });
  }

}
