import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../../Tarefa';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../Categoria';

@Component({
    selector: 'app-add-task',
    imports: [FormsModule, ButtonComponent, CommonModule],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Input() categories: Categoria[] = [];
  @Output() onAddTask = new EventEmitter<Tarefa>();

  name: string = '';
  description: string = 'Descrição padrão';
  active: boolean = true;
  isCompleted: boolean = false;
  categoryId!: number;

  mostrarAddTarefa: boolean = false;

  AlteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
  }

  onSubmit() {
    if (!this.name || !this.categoryId) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const novaTarefa: Tarefa = {
      name: this.name,
      description: this.description,
      active: this.active,
      isCompleted: this.isCompleted,
      categoryId: this.categoryId
    };

    this.onAddTask.emit(novaTarefa);

    this.name = '';
    this.categoryId = 0;
    this.isCompleted = false;
  }
}
