import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', children: [] }, 
  { path: 'users', component: UsersListComponent },
    { path: '**', redirectTo: '' }
];