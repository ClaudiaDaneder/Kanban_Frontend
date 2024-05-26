import { Component, Input, inject, input } from '@angular/core';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() taskId!: number;
  activeModal = inject(NgbActiveModal);
  task!: any;

  constructor(private ts: TaskService) {
    this.ts.loadTaskDetails(this.taskId);
    console.log(this.taskId);
    

  }
}
