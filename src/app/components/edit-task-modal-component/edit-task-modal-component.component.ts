import { Component, Input, Output } from '@angular/core';
import { Tarefa } from '../../../Tarefa';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { EventEmitter } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../../../Categoria';

@Component({
  selector: 'app-edit-task-modal-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-task-modal-component.component.html',
  styleUrl: './edit-task-modal-component.component.css'
})
export class EditTaskModalComponent {
  @Input() tarefa!: Tarefa;
  @Output() saveTask = new EventEmitter<Tarefa>();
  categories: Categoria[] = [];

  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getCategories().subscribe((categorias) => {
      this.categories = categorias;
    });
  }

  onSave() {
    this.saveTask.emit(this.tarefa);
    this.activeModal.close(this.tarefa);
  }

  onClose() {
    this.activeModal.dismiss();
  }
}