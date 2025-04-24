import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../Tarefa';
import { Categoria } from '../../../Categoria';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  template: `
    <div class="kanban-board">
      <div class="board-header">
        <div class="header-left">
          <h2>Quadro de Tarefas</h2>
          <span class="board-subtitle">Gerencie suas tarefas de forma visual</span>
        </div>
        <div class="header-right">
          <div class="filter-wrapper">
            <select [(ngModel)]="selectedCategory" (change)="filterByCategory()" class="filter-dropdown">
              <option [value]="null">Todas as categorias</option>
              <option *ngFor="let category of categories" [value]="category.id">
                {{ category.name }}
              </option>
            </select>
            <i class="bi bi-chevron-down filter-icon"></i>
          </div>
          <button class="btn-new-task" (click)="openNewTaskModal()">
            <i class="bi bi-plus"></i> Nova Tarefa
          </button>
        </div>
      </div>

      <div class="board-columns">
        <!-- Coluna A Fazer -->
        <div class="board-column">
          <div class="column-header">
            <div class="column-title">
              <h3>A Fazer</h3>
              <span class="task-count">{{ notStartedTasks.length }}</span>
            </div>
          </div>
          <div class="task-list" id="todo" cdkDropList #todoList="cdkDropList" 
               [cdkDropListData]="notStartedTasks"
               [cdkDropListConnectedTo]="[doingList, doneList]"
               (cdkDropListDropped)="drop($event)">
            <div class="task-card" *ngFor="let task of notStartedTasks" cdkDrag
                 (click)="openEditTaskModal(task)">
              <h4>{{ task.name }}</h4>
              <p class="task-description">{{ task.description }}</p>
              <div class="task-metadata">
                <span class="task-date">Criado em: {{ task.createdAt | date:'dd MMM yyyy' }}</span>
                <span class="priority-badge" [ngClass]="getCategoryColor(task.categoryId)">
                  {{ getCategoryName(task.categoryId) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna Em Progresso -->
        <div class="board-column">
          <div class="column-header">
            <div class="column-title">
              <h3>Em Progresso</h3>
              <span class="task-count">{{ inProgressTasks.length }}</span>
            </div>
          </div>
          <div class="task-list" id="doing" cdkDropList #doingList="cdkDropList"
               [cdkDropListData]="inProgressTasks"
               [cdkDropListConnectedTo]="[todoList, doneList]"
               (cdkDropListDropped)="drop($event)">
            <div class="task-card" *ngFor="let task of inProgressTasks" cdkDrag
                 (click)="openEditTaskModal(task)">
              <h4>{{ task.name }}</h4>
              <p class="task-description">{{ task.description }}</p>
              <div class="task-metadata">
                <span class="task-date">Criado em: {{ task.createdAt | date:'dd MMM yyyy' }}</span>
                <span class="priority-badge" [ngClass]="getCategoryColor(task.categoryId)">
                  {{ getCategoryName(task.categoryId) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna Concluído -->
        <div class="board-column">
          <div class="column-header">
            <div class="column-title">
              <h3>Concluído</h3>
              <span class="task-count">{{ completedTasks.length }}</span>
            </div>
          </div>
          <div class="task-list" id="done" cdkDropList #doneList="cdkDropList"
               [cdkDropListData]="completedTasks"
               [cdkDropListConnectedTo]="[todoList, doingList]"
               (cdkDropListDropped)="drop($event)">
            <div class="task-card" *ngFor="let task of completedTasks" cdkDrag
                 (click)="openEditTaskModal(task)">
              <h4>{{ task.name }}</h4>
              <p class="task-description">{{ task.description }}</p>
              <div class="task-metadata">
                <span class="task-date">Criado em: {{ task.createdAt | date:'dd MMM yyyy' }}</span>
                <span class="priority-badge" [ngClass]="getCategoryColor(task.categoryId)">
                  {{ getCategoryName(task.categoryId) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-backdrop" *ngIf="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</h3>
          <button class="btn-close" (click)="closeModal()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nome</label>
              <input type="text" id="name" [(ngModel)]="currentTask.name" name="name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea id="description" [(ngModel)]="currentTask.description" name="description" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="category">Categoria</label>
              <select id="category" [(ngModel)]="currentTask.categoryId" name="categoryId" class="form-control" required>
                <option value="">Selecione uma categoria</option>
                <option *ngFor="let category of categories" [value]="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="progress">Status</label>
              <select id="progress" [(ngModel)]="currentTask.progress" name="progress" class="form-control" required>
                <option [value]="0">A Fazer</option>
                <option [value]="1">Em Progresso</option>
                <option [value]="2">Concluído</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Salvar' : 'Criar' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kanban-board {
      padding: 24px;
      background-color: #f4f5f7;
      min-height: 100vh;
    }

    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .header-left h2 {
      font-size: 24px;
      font-weight: 500;
      color: #172b4d;
      margin: 0;
    }

    .board-subtitle {
      font-size: 14px;
      color: #9fadbc;
      width: 100%;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-wrapper {
      position: relative;
      margin-right: 8px;
    }

    .filter-dropdown {
      padding: 8px 32px 8px 12px;
      border: 1px solid #dfe1e6;
      border-radius: 3px;
      background-color: #fff;
      color: #172b4d;
      font-size: 14px;
      cursor: pointer;
      min-width: 160px;
      appearance: none;
    }

    .filter-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #6b778c;
      pointer-events: none;
    }

    .btn-new-task {
      background-color: #7460ee;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-new-task:hover {
      background-color: #6355cc;
    }

    .board-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 24px;
    }

    .board-column {
      border-radius: 8px;
      min-width: 300px;
      min-height: calc(100vh - 150px);
    }

    /* Cores de fundo específicas para cada coluna */
    #todo {
      background-color:rgb(238, 242, 255);
    }

    #doing {
      background-color:rgb(250, 247, 239);
    }

    #done {
      background-color:rgb(241, 255, 244);
    }

    .column-header {
      padding: 12px 16px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }

    .column-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .column-title h3 {
      font-size: 14px;
      font-weight: 500;
      color: #172b4d;
      margin: 0;
    }

    .task-count {
      background-color: rgba(0, 0, 0, 0.08);
      color: #172b4d;
      padding: 0px 8px;
      border-radius: 10px;
      font-size: 12px;
      line-height: 20px;
      font-weight: normal;
    }

    .task-list {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 100px;
      height: calc(100% - 50px);
    }

    .task-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 16px;
      cursor: pointer;
      border: 1px solid #dfe1e6;
      width: 100%;
      position: relative;
    }

    .task-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      border-radius: 8px 0 0 8px;
    }

    /* Cards da coluna "A Fazer" */
    #todo .task-card::before {
      background-color: #2196F3;
    }

    /* Cards da coluna "Em Progresso" */
    #doing .task-card::before {
      background-color: #FFC107;
    }

    /* Cards da coluna "Concluído" */
    #done .task-card::before {
      background-color: #4CAF50;
    }

    .task-card:hover {
      background-color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: #c1c7d0;
    }

    .task-card h4 {
      font-size: 14px;
      font-weight: 500;
      color: #172b4d;
      margin: 0 0 8px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
      max-height: 40px;
    }

    .task-description {
      font-size: 13px;
      color: #6b778c;
      margin: 0 0 12px 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .task-metadata {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #6b778c;
    }

    .task-date {
      color: #6b778c;
      font-size: 11px;
    }

    .priority-badge {
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 500;
    }

    .alta {
      background-color: #ffebe6;
      color: #bf2600;
    }

    .media {
      background-color: #fff7e6;
      color: #974f0c;
    }

    .baixa {
      background-color: #e3fcef;
      color: #006644;
    }

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
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.4rem;
      color: #333;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      color: #666;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .btn-close:hover {
      background-color: #f5f5f5;
      color: #333;
    }

    .modal-body {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .form-control:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
      outline: none;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
      padding: 20px;
      border-top: 1px solid #eee;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
      border: none;
    }

    .btn-secondary:hover {
      background-color: #545b62;
    }
  `]
})
export class KanbanBoardComponent implements OnInit {
  tasks: Tarefa[] = [];
  categories: Categoria[] = [];
  notStartedTasks: Tarefa[] = [];
  inProgressTasks: Tarefa[] = [];
  completedTasks: Tarefa[] = [];
  showModal: boolean = false;
  selectedCategory: number | null = null;
  isEditing = false;
  currentTask: Tarefa = {
    name: '',
    description: '',
    active: true,
    isCompleted: false,
    categoryId: 0,
    progress: 0
  };
  selectedStatus: string = 'A Fazer';
  newTask: Tarefa = {
    id: 0,
    name: '',
    description: '',
    active: true,
    isCompleted: false,
    categoryId: 1,
    progress: 0
  };
  allTasks: Tarefa[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTasks();
  }

  loadCategories() {
    this.taskService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.allTasks = [...tasks];
        this.distributeTasksByProgress();
      }
    );
  }

  filterByCategory() {
    if (!this.selectedCategory) {
      this.tasks = [...this.allTasks];
      this.distributeTasksByProgress();
      return;
    }
    
    this.taskService.getCategoryWithTasks(Number(this.selectedCategory)).subscribe(
      (category) => {
        if (category && category.chores) {
          this.tasks = category.chores.map(categoryTask => {
            const existingTask = this.allTasks.find(t => t.id === categoryTask.id);
            if (existingTask) {
              return {
                ...categoryTask,
                progress: existingTask.progress
              };
            }
            return categoryTask;
          });
          
          this.distributeTasksByProgress();
        }
      }
    );
  }

  distributeTasksByProgress() {
    // Limpa os arrays antes de distribuir as tarefas
    this.notStartedTasks = [];
    this.inProgressTasks = [];
    this.completedTasks = [];

    // Distribui as tarefas baseado apenas no progress
    this.tasks.forEach(task => {
      switch (task.progress) {
        case 0:
          this.notStartedTasks.push(task);
          break;
        case 1:
          this.inProgressTasks.push(task);
          break;
        case 2:
          this.completedTasks.push(task);
          break;
      }
    });
  }

  getCategoryColor(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return 'baixa';
    
    switch(category.name.toLowerCase()) {
      case 'alta':
        return 'alta';
      case 'média':
      case 'media':
        return 'media';
      default:
        return 'baixa';
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  openNewTaskModal() {
    this.isEditing = false;
    this.currentTask = {
      name: '',
      description: '',
      active: true,
      isCompleted: false,
      categoryId: 0,
      progress: 0
    };
    this.showModal = true;
  }

  openEditTaskModal(task: Tarefa) {
    this.isEditing = true;
    this.currentTask = { ...task }; 
    
    
    switch (task.progress) {
      case 0:
        this.selectedStatus = 'A Fazer';
        break;
      case 1:
        this.selectedStatus = 'Em Progresso';
        break;
      case 2:
        this.selectedStatus = 'Concluído';
        break;
    }
    
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentTask = {
      name: '',
      description: '',
      active: true,
      isCompleted: false,
      categoryId: 0,
      progress: 0
    };
  }

  onSubmit() {
    if (this.isEditing && this.currentTask.id) {
      
      if (this.getProgressFromStatus(this.selectedStatus) !== this.currentTask.progress) {
        this.currentTask.progress = this.getProgressFromStatus(this.selectedStatus);
      }
      
      this.taskService.updateTask(this.currentTask).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.loadTasks();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
        }
      });
    } else {
      const newTask: Tarefa = {
        ...this.currentTask,
        progress: this.getProgressFromStatus(this.selectedStatus)
      };
      
      this.taskService.addTask(newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.loadTasks();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao adicionar tarefa:', error);
        }
      });
    }
  }

  getProgressFromStatus(status: string): number {
    switch (status) {
      case 'A Fazer':
        return 0;
      case 'Em Progresso':
        return 1;
      case 'Concluído':
        return 2;
      default:
        return 0;
    }
  }

  editTask(task: Tarefa) {
    
  }

  deleteTask(task: Tarefa) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(task).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const task = event.container.data[event.currentIndex];
      const containerId = event.container.element.nativeElement.getAttribute('id');
      
      // Atualiza apenas o progress baseado na coluna
      if (containerId === 'todo') {
        task.progress = 0;
      } else if (containerId === 'doing') {
        task.progress = 1;
      } else if (containerId === 'done') {
        task.progress = 2;
      }

      this.taskService.updateTask(task).subscribe(() => {
        this.loadTasks();
      });
    }
  }
} 