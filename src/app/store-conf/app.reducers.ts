import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { initialState } from './app.state';

export const appTodosReducer = createReducer(
    initialState,
    // TODO Check that deep copying of state effectively works
    on(AppActions.loadTodosSuccessAction, (state, { payload } ) => ({ ...state, todos: payload.todos }))
  );