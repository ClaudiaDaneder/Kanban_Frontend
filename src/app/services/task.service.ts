import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';
import { Board } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskId!: number;

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

  loadAllUserTasks() {
    let url = this.baseURL + 'tasks/';
    return lastValueFrom(this.http.get(url))
  }

  loadTaskDetails(taskId: number): Promise<Task> {
    let url = this.baseURL + `tasks/${taskId}/details/`;
    return lastValueFrom(this.http.get<Task>(url))
  }

  deleteTask(taskId: number) {
    let url = this.baseURL + `tasks/${taskId}/details/`;
    return lastValueFrom(this.http.delete<Task>(url))
  }

  updateTask(taskId: number, taskData: any) {
    let url = this.baseURL + `tasks/${taskId}/details/`;
    return lastValueFrom(this.http.put(url, taskData))
  }

  newBoard(boardData: any) {
    let url = this.baseURL + 'boards/new/';
    return lastValueFrom(this.http.post(url, boardData));
  }

  loadBoards() {
      let url = this.baseURL + 'boards/';
      return lastValueFrom(this.http.get(url))
    }

  deleteBoard(boardId: number) {
    let url = this.baseURL + `boards/${boardId}/details/`
    return lastValueFrom(this.http.delete<Board>(url))
  }


  updateBoard(boardId: number, boardData: any) {
    let url = this.baseURL + `boards/${boardId}/details/`;
    return lastValueFrom(this.http.put(url, boardData))
  }

}
