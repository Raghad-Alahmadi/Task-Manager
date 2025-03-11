import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';

// Keep Task interface definition in reducer file
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, error })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TaskActions.addTaskFailure, (state, { error }) => ({ ...state, error })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t),
  })),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({ ...state, error })),
  on(TaskActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== taskId),
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({ ...state, error })),
);