import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  
  loadUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => 
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
  
  loadUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(({ id }) => 
        this.userService.getUser(id).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error: error.message })))
        )
      )
    )
  );
  
  createUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) => 
        this.userService.createUser(user).pipe(
          map(user => UserActions.createUserSuccess({ user })),
          catchError(error => of(UserActions.createUserFailure({ error: error.message })))
        )
      )
    )
  );
  
  updateUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ id, user }) => 
        this.userService.updateUser(id, user).pipe(
          map(() => UserActions.updateUserSuccess({ user })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );
  
  deleteUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) => 
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
}