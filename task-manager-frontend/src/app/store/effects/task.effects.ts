import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TaskActions from '../actions/task.actions';
import { TaskService } from '../../services/task.service';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => 
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  addTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ task }) => 
        this.taskService.addTask(task).pipe(
          map(newTask => TaskActions.addTaskSuccess({ task: newTask })),
          catchError(error => of(TaskActions.addTaskFailure({ error: error.message })))
        )
      )
    )
  );

  updateTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) => 
        this.taskService.updateTask(task).pipe(
          map(updatedTask => TaskActions.updateTaskSuccess({ task: updatedTask })),
          catchError(error => of(TaskActions.updateTaskFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ taskId }) => 
        this.taskService.deleteTask(taskId).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskId })),
          catchError(error => of(TaskActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );
}