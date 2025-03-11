import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  loaded: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ 
    ...state, 
    users, 
    loading: false, 
    loaded: true 
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  
  // Load Single User
  on(UserActions.loadUser, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({ 
    ...state, 
    selectedUser: user, 
    loading: false 
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  
  // Create User
  on(UserActions.createUser, (state) => ({ ...state, loading: true })),
  on(UserActions.createUserSuccess, (state, { user }) => ({ 
    ...state, 
    users: [...state.users, user], 
    loading: false 
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  
  // Update User
  on(UserActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: user,
    loading: false
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  
  // Delete User
  on(UserActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    loading: false
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  }))
);