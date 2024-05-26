import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss'
})
export class CreateBoardComponent {
  activeModal = inject(NgbActiveModal);
  title = '';


  constructor(private ts: TaskService) {}

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
