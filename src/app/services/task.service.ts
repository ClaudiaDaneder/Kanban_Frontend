import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board } from '../interfaces/board';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http: HttpClient) { }

  private baseURL = environment.baseURL

  newTask(taskData: any) {
    let url = this.baseURL + 'tasks/new/';
    return lastValueFrom(this.http.post(url, taskData))
  }

  loadTaskList(boardId: number) {
    let url = this.baseURL + `boards/${boardId}/tasks/`;
    return lastValueFrom(this.http.get(url))
  }

  loadTaskDetails(taskId: number) {
    let url = this.baseURL + `tasks/${taskId}/details/`;
    return lastValueFrom(this.http.get(url))
  }

  deleteTask(taskId: number) {
    let url = this.baseURL + `tasks/${taskId}/delete/`;
    return lastValueFrom(this.http.delete(url))
  }

  newBoard(boardData: any) {
    let url = this.baseURL + 'boards/new/';
    return lastValueFrom(this.http.post(url, boardData));
  }

  loadBoards() {
      let url = this.baseURL + 'boards/';
      return lastValueFrom(this.http.get(url))
    }

}
