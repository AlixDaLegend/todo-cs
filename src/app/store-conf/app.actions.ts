import { createAction, props } from '@ngrx/store';
import { Todo } from '../shared/models/todo';

export enum AppActionsType {
    LOAD = '[App component] Load Todos',
    SUCCESS = '[App component] Load Todos success'
}

export const loadTodosAction = createAction(AppActionsType.LOAD);
export const loadTodosSuccessAction = createAction(AppActionsType.SUCCESS, props<{ payload: { todos: Todo[] } }>());
