import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../../Tarefa';
import { Categoria } from '../../../Categoria';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" *ngIf="show">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</h3>
          <button class="btn-close" (click)="close()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nome</label>
              <input type="text" id="name" [(ngModel)]="task.name" name="name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea id="description" [(ngModel)]="task.description" name="description" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="category">Categoria</label>
              <select id="category" [(ngModel)]="task.categoryId" name="categoryId" class="form-control" required>
                <option value="">Selecione uma categoria</option>
                <option *ngFor="let category of categories" [value]="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" [(ngModel)]="task.active" name="active">
                Ativa
              </label>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" [(ngModel)]="task.isCompleted" name="isCompleted">
                Concluída
              </label>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="close()">Cancelar</button>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #666;
    }

    .modal-body {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
      border: none;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
      border: none;
    }
  `]
})
export class TaskModalComponent {
  @Input() show: boolean = false;
  @Input() task: Tarefa = {
    id: 0,
    name: '',
    description: '',
    active: true,
    isCompleted: false,
    categoryId: 0,
    category: ''
  };
  @Input() categories: Categoria[] = [];
  @Input() isEditing: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveTask = new EventEmitter<Tarefa>();

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.saveTask.emit(this.task);
  }
} 