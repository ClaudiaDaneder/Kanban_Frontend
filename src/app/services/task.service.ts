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

  loadTasks(boardId: number) {
    const url = environment.baseURL + `boards/` + boardId;
    return lastValueFrom(this.http.get(url))
  }

  newBoard(boardData: any) {
    const url = environment.baseURL + 'boards/new/';
    return lastValueFrom(this.http.post(url, boardData));
  }

  loadBoards() {
      const url = environment.baseURL + 'boards/';
      return lastValueFrom(this.http.get(url))
    }

}
