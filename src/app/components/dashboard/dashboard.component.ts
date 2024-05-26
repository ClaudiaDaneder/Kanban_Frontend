import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from '../modals/create-task/create-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private modalService = inject(NgbModal);

  openCreateNewTaskModal() {
    this.modalService.open(CreateTaskComponent, { size: 'lg' });
  }

  openCreateNewBoardModal() {
    this.modalService.open(CreateBoardComponent, { size: 's' });
  }
}
