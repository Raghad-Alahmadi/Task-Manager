import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../store/reducers/task.reducer';
import { loadTasks, deleteTask, updateTask } from '../../store/actions/task.actions';
import { selectAllTasks } from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  taskToDelete: string | null = null;

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  promptDeleteTask(taskId: string): void {
    this.taskToDelete = taskId;
  }
  
  cancelDelete(): void {
    this.taskToDelete = null;
  }

  confirmDeleteTask(taskId: string): void {
    this.store.dispatch(deleteTask({ taskId }));
    this.taskToDelete = null;
  }

  toggleComplete(task: Task): void {
    const updatedTask = { 
      ...task, 
      completed: !task.completed 
    };
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  editTask(task: Task, newTitle?: string, newDescription?: string): void {
    if (!newTitle && !newDescription) return;
    
    const updatedTask = { 
      ...task,
      title: newTitle || task.title,
      description: newDescription || task.description
    };
    
    this.store.dispatch(updateTask({ task: updatedTask }));
  }
}