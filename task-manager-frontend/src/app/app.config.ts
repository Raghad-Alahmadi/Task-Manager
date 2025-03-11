import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { taskReducer } from './store/reducers/task.reducer';
import { TaskEffects } from './store/effects/task.effects';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({
      tasks: taskReducer,
      users: userReducer
    }),
    provideEffects([TaskEffects, UserEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideHttpClient(withFetch()) 
  ]
};