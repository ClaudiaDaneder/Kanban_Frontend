import { Component, Input, inject } from '@angular/core';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() taskId!: number;
  task!: any;
  activeModal = inject(NgbActiveModal);

  constructor(private ts: TaskService) {
    this.loadTaskDetails();
  }

  async loadTaskDetails() {
    console.log(this.taskId);
    console.log(this.task);
    try {
      this.task = await this.ts.loadTaskDetails(this.taskId);

    } catch (e) {
      console.log('An error occurred, please help me: ', e);

    }
  }
}
