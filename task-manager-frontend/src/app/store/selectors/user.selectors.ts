import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

// Get the entire users state slice
export const selectUserState = createFeatureSelector<UserState>('users');

// Select all users array
export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

// Select a specific user by ID
export const selectUserById = (userId: number) => createSelector(
  selectAllUsers,
  (users) => users.find(user => user.id === userId) || null
);

// Select the currently selected user
export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);

// Select loading state
export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

// Select loaded state (if data has been fetched)
export const selectUsersLoaded = createSelector(
  selectUserState,
  (state) => state.loaded
);

// Select error state
export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

// Select user count
export const selectUserCount = createSelector(
  selectAllUsers,
  (users) => users.length
);