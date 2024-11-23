import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { Tarefa } from '../../Tarefa';
import { Categoria } from '../../Categoria';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7215/api/chore';
  private apiUrlCategories = 'https://localhost:7215/api/category'

  constructor(private http: HttpClient, private toaster : ToastrService) { }

  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  deleteTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.apiUrl}/${tarefa.id}`);
  }

  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa);
  }

  addTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiUrl}`, tarefa);
  }

  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrlCategories);
  }

  reactivateTask(tarefaId: number): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiUrl}/reactive/${tarefaId}`, {});
  }
}
