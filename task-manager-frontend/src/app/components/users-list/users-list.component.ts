import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/reducers/user.reducer';
import * as UserActions from '../../store/actions/user.actions';
import { selectAllUsers, selectUsersLoading } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  userForm: FormGroup;
  isEditing = false;
  selectedUserId: number | null = null;
  allUsers: User[] = [];
  formSubmitted = false;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    
    // Store users for validation
    this.users$.subscribe(users => {
      this.allUsers = users;
    });
    
    this.userForm = this.fb.group({
      username: ['', [Validators.required], [this.uniqueUsernameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email], [this.uniqueEmailValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  uniqueUsernameValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      if (!control.value || control.value.trim() === '') {
        return resolve(null);
      }

      const username = control.value.toLowerCase();
      const isDuplicate = this.allUsers.some(user => 
        user.username.toLowerCase() === username && 
        user.id !== this.selectedUserId
      );

      resolve(isDuplicate ? { uniqueUsername: true } : null);
    });
  }

  uniqueEmailValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      if (!control.value || control.value.trim() === '') {
        return resolve(null);
      }

      const email = control.value.toLowerCase();
      const isDuplicate = this.allUsers.some(user => 
        user.email.toLowerCase() === email && 
        user.id !== this.selectedUserId
      );

      resolve(isDuplicate ? { uniqueEmail: true } : null);
    });
  }

  startAdd(): void {
    this.isEditing = false;
    this.selectedUserId = null;
    this.userForm.reset();
    this.formSubmitted = false;
  }

  startEdit(user: User): void {
    this.isEditing = true;
    this.selectedUserId = user.id;
    this.formSubmitted = false; 
    this.userForm.patchValue({
      username: user.username,
      email: user.email
    });
  }

  cancelForm(): void {
    this.userForm.reset();
    this.isEditing = false;
    this.selectedUserId = null;
    this.formSubmitted = false; 
  }

  onSubmit(): void {
    this.formSubmitted = true; 
    
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      if (this.isEditing && this.selectedUserId !== null) {
        // Update existing user
        const updatedUser: User = {
          id: this.selectedUserId,
          ...userData
        };
        
        this.store.dispatch(UserActions.updateUser({ 
          id: this.selectedUserId, 
          user: updatedUser 
        }));
        
        this.cancelForm();
      } else {
        // Create new user
        const newUser: User = {
          id: 0, 
          ...userData
        };
        
        this.store.dispatch(UserActions.createUser({ user: newUser }));
        
        this.cancelForm();
      }
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }
}