import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent]
})
export class AppComponent {
  title = 'task-management-system';
}