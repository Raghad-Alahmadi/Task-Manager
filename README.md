# Task Manager

Task Manager is a web application that allows users to manage their tasks efficiently. It provides features to add, edit, delete, and mark tasks as completed. The application is built using Angular and NgRx for state management.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- View a list of all tasks
- Manage users (add, edit, delete)
- Responsive design

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   ng serve
   ```

## Running the Backend APIs

To run the backend services, follow these steps:

### Prerequisites
- .NET 7 SDK installed on your machine
- SQL Server or SQL Server Express installed locally or accessible

### Running the TaskService API

1. **Navigate to the TaskService directory:**
   ```bash
   cd task-manager-backend/TaskService
   ```

2. **Update the connection string:**
   Open `appsettings.json` and update the connection string to point to your SQL Server instance.

3. **Apply database migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Run the API:**
   ```bash
   dotnet run
   ```

   The Task API will be available at https://localhost:5001/api/tasks

### Running the UserService API

1. **Navigate to the UserService directory:**
   ```bash
   cd task-manager-backend/UserService
   ```

2. **Update the connection string:**
   Open `appsettings.json` and update the connection string to point to your SQL Server instance.

3. **Apply database migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Run the API:**
   ```bash
   dotnet run
   ```

## API Endpoints

### Task API
- GET `/api/tasks` - Get all tasks
- GET `/api/tasks/{id}` - Get task by ID
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/{id}` - Update a task
- DELETE `/api/tasks/{id}` - Delete a task

### User API
- GET `/api/users` - Get all users
- GET `/api/users/{id}` - Get user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/{id}` - Update a user
- DELETE `/api/users/{id}` - Delete a user

### Testing the APIs
You can test the APIs using tools like Postman or Swagger UI, which is available at:

- Task API Swagger: https://localhost:5001/swagger
- User API Swagger: https://localhost:5003/swagger

## State Management with NgRx

The application uses NgRx for state management, providing a robust architecture for handling data flow.

### NgRx Store Structure

The state management is organized into feature modules:
- **Task State**: Manages all task-related data
- **User State**: Manages all user-related data

### Core NgRx Components

1. **Actions**:
   - Defined in `src/app/store/actions/*.actions.ts`
   - Represent events that happen in the application
   - Examples: `loadTasks`, `addTask`, `updateTask`, `deleteTask`

2. **Reducers**:
   - Defined in `src/app/store/reducers/*.reducer.ts`
   - Handle state transitions based on dispatched actions
   - Implement pure functions that return a new state object

3. **Selectors**:
   - Defined in `src/app/store/selectors/*.selectors.ts`
   - Extract specific pieces of state
   - Enable component-level data access without knowledge of state structure

4. **Effects**:
   - Defined in `src/app/store/effects/*.effects.ts`
   - Handle side effects like API calls
   - Use RxJS operators to process actions, make API calls, and dispatch new actions

### Data Flow

1. **Component** dispatches an action (e.g., `loadTasks`)
2. **Effect** intercepts the action and makes an API call
3. On API response, the effect dispatches a success action (e.g., `loadTasksSuccess`)
4. **Reducer** handles the success action and updates the state
5. **Selectors** extract the updated state
6. **Components** receive the updated data through selectors and Observable pattern

### Example NgRx Implementation

Task component dispatches an action to add a new task:
```typescript
// In task-form.component.ts
onSubmit(): void {
  if (this.taskForm.valid) {
    const task: Task = this.taskForm.value;
    this.store.dispatch(addTask({ task }));
    this.resetForm();
  }
}
```

Task effect handles the API call:
```typescript
// In task.effects.ts
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
```

Task reducer updates the state:
```typescript
// In task.reducer.ts
on(TaskActions.addTaskSuccess, (state, { task }) => {
  return taskAdapter.addOne(task, { ...state, loading: false });
})
```

Component subscribes to selectors:
```typescript
// In task-list.component.ts
constructor(private store: Store) {
  this.tasks$ = this.store.select(selectAllTasks);
}
```

## Frontend Structure

```
task-manager/
├── task-manager-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── task-form/
│   │   │   │   │   ├── task-form.component.ts
│   │   │   │   │   ├── task-form.component.html
│   │   │   │   │   ├── task-form.component.css
│   │   │   │   ├── task-list/
│   │   │   │   │   ├── task-list.component.ts
│   │   │   │   │   ├── task-list.component.html
│   │   │   │   │   ├── task-list.component.css
│   │   │   │   ├── users-list/
│   │   │   │   │   ├── users-list.component.ts
│   │   │   │   │   ├── users-list.component.html
│   │   │   │   │   ├── users-list.component.css
│   │   │   ├── services/
│   │   │   │   ├── task.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   ├── store/
│   │   │   │   ├── actions/
│   │   │   │   │   ├── task.actions.ts
│   │   │   │   │   ├── user.actions.ts
│   │   │   │   ├── effects/
│   │   │   │   │   ├── task.effects.ts
│   │   │   │   │   ├── user.effects.ts
│   │   │   │   ├── reducers/
│   │   │   │   │   ├── task.reducer.ts
│   │   │   │   │   ├── user.reducer.ts
│   │   │   │   ├── selectors/
│   │   │   │   │   ├── task.selectors.ts
│   │   │   │   │   ├── user.selectors.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   ├── app.module.ts
│   │   │   ├── app-routing.module.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   ├── environment.prod.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── styles.css
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
```

## Backend Structure

```
├── task-manager-backend/
│   ├── TaskService/
│   │   ├── Controllers/
│   │   │   ├── TasksController.cs
│   │   ├── Models/
│   │   │   ├── Task.cs
│   │   │   │   ├──Dto/
│   │   │   │       ├──TaskDto.cs
│   │   ├── Data/
│   │   │   ├── AppDbContext.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── TaskService.csproj
│   │   ├── Dockerfile
│   │
│   ├── UserService/
│   │   ├── Controllers/
│   │   │   ├── UsersController.cs
│   │   ├── Models/
│   │   │   ├── User.cs
│   │   │   │   ├──Dto/
│   │   │   │       ├──UserDto.cs
│   │   ├── Data/
│   │   │   ├── AppDbContext.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── UserService.csproj
```

## Building the Project

To build the project for production, use the following command:

```bash
ng build
```

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.
