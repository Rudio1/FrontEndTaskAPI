import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Tarefa } from '../../../Tarefa';
import { faTimes, faRedo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../Categoria';

@Component({
    selector: 'app-task-item',
    imports: [FontAwesomeModule, CommonModule],
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnChanges {
  @Input() tarefa!: Tarefa;
  @Output() onDeleteTask = new EventEmitter<Tarefa>();
  @Output() onToggleConcluido = new EventEmitter<Tarefa>();
  @Output() onReactive = new EventEmitter<Tarefa>();
  @Output() onEditTask = new EventEmitter<Tarefa>(); 
  @Input() categories: Categoria[] = [];
  @Input() mostrarInativas: boolean = false;

  descriptionVisible: boolean = false; // Controle local de exibição da descrição
  faTimes = faTimes;
  faRedo = faRedo;
  faEdit = faEdit;

  ngOnChanges(changes: SimpleChanges): void {}

  getCategoryName(): string {
    return this.tarefa.category ?? 'Categoria não encontrada';
  }

  get taskStatus() {
    return this.mostrarInativas || this.tarefa.active;
  }

  onDelete(tarefa: Tarefa) {
    this.onDeleteTask.emit(tarefa);
  }

  onToggle(tarefa: Tarefa) {
    this.onToggleConcluido.emit(tarefa);
  }

  onReactivate(tarefa: Tarefa) {
    this.tarefa.active = false;
    this.onReactive.emit(this.tarefa);
  }

  // Emite o evento de edição para o componente pai abrir o modal
  onEdit(tarefa: Tarefa) {
    this.onEditTask.emit(tarefa);
  }
}
