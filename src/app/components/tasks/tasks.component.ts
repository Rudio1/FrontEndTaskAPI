import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../Tarefa';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Categoria } from '../../../Categoria';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Importando para o modal
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { EditTaskModalComponent } from '../edit-task-modal-component/edit-task-modal-component.component';

@Component({
  selector: 'app-tasks',
  standalone: true, 
  imports: [
    CommonModule,
    TaskItemComponent,
    AddTaskComponent,
    FormsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tarefas: Tarefa[] = [];
  categories: Categoria[] = [];
  mostrarInativas: boolean = false;
  selectedCategory: Categoria | null = null;
  tarefaEdicao: Tarefa | null = null;

  tarefasPorPagina: number = 5; // Número de tarefas por página
  paginaAtual: number = 1; // Página inicial

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
    this.taskService.getCategories()
      .subscribe((categorias) => {
        this.categories = categorias;
      });
  }

  carregarTarefas() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tarefas = tasks
        .filter(tarefa => this.mostrarInativas ? !tarefa.active : tarefa.active)
        .map((tarefa) => {
          return {
            ...tarefa,
            categoryName: tarefa.category || 'Categoria não encontrada'
          };
        });
      this.cdRef.detectChanges();
    });
  }

  onToggleMostrarInativas() {
    this.mostrarInativas = !this.mostrarInativas;
    // Volta para a tela 1 da paginação
    this.paginaAtual = 1; // Resetar para a primeira página ao mudar o filtro
    this.carregarTarefas();
  }

  AddTask(tarefa: Tarefa) {
    if (this.selectedCategory) {
      tarefa.categoryId = this.selectedCategory.id ? this.selectedCategory.id : 0;
    }
    this.taskService.addTask(tarefa).subscribe((novaTarefa) => {
      this.tarefas.push(novaTarefa);
      this.toaster.success('Tarefa adicionada com sucesso!');
      this.carregarTarefas();
    });
  }

  deleteTask(tarefa: Tarefa) {
    this.taskService.deleteTask(tarefa).subscribe(() => {
      this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id);
      this.toaster.info('Tarefa deletada com sucesso!');
    });
  }

  toggleConcluiido(tarefa: Tarefa) {
    tarefa.isCompleted = !tarefa.isCompleted;

    this.taskService.updateTask(tarefa).subscribe({
      next: () => {
        const mensagem = tarefa.isCompleted
          ? 'Tarefa concluída com sucesso!'
          : 'Tarefa desconcluída com sucesso!';
        this.toaster.success(mensagem);
      },
      error: () => {
        this.toaster.error('Erro ao atualizar a tarefa.');
        tarefa.isCompleted = !tarefa.isCompleted;
      }
    });
  }

  onReactivate(tarefa: Tarefa): void {
    if (tarefa.id !== undefined && tarefa.id !== null) {
      this.taskService.reactivateTask(tarefa.id).subscribe(response => {
        const tarefaAtualizada = this.tarefas.find(t => t.id === tarefa.id);
        if (tarefaAtualizada) {
          tarefaAtualizada.active = true;
          tarefaAtualizada.isCompleted = false;
          this.toaster.success('Tarefa ' + tarefaAtualizada.name + ' reativada com sucesso!');
          this.carregarTarefas();
          this.cdRef.detectChanges();
        }
      });
    } else {
      console.error('Tarefa sem ID');
    }
  }

  onEditTask(tarefa: Tarefa) {
    const modalRef: NgbModalRef = this.modalService.open(EditTaskModalComponent);
    modalRef.componentInstance.tarefa = { ...tarefa };
    modalRef.closed.subscribe((tarefaAtualizada: Tarefa) => {
      if (tarefaAtualizada) {
        this.saveUpdatedTask(tarefaAtualizada);
        this.toaster.success('Tarefa atualizada com sucesso!');
      }
    });
  }

  saveUpdatedTask(tarefaAtualizada: Tarefa) {
    this.taskService.updateTask(tarefaAtualizada).subscribe(() => {
      const index = this.tarefas.findIndex((t) => t.id === tarefaAtualizada.id);
      if (index !== -1) {
        this.tarefas[index] = tarefaAtualizada;
      }
    });
  }

  get tarefasParaPagina() {
    const inicio = (this.paginaAtual - 1) * this.tarefasPorPagina;
    const fim = inicio + this.tarefasPorPagina;
    return this.tarefas.slice(inicio, fim);
  }

  get totalDePaginas() {
    return Math.ceil(this.tarefas.length / this.tarefasPorPagina);
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalDePaginas) {
      this.paginaAtual++;
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }
}

