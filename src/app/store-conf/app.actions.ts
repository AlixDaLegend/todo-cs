import { createAction, props } from '@ngrx/store';
import { Todo } from '../shared/models/todo';

export enum AppActionsType {
    LOAD = '[Main] Load Todos',
    LOAD_SUCCESS = '[Main] Load Todos success',
    TODO_STATE_TOGGLE = '[Main] Toggle todo state',
    TODO_CREATE = '[Main] Create Todo ',
    TODO_CREATE_SUCCESS = '[Main] Create Todo success'
}

export const loadTodosAction = createAction(AppActionsType.LOAD);
export const loadTodosSuccessAction = createAction(AppActionsType.LOAD_SUCCESS, props<{ payload: { todos: Todo[] } }>());
export const toggleTodoStateAction = createAction(AppActionsType.TODO_STATE_TOGGLE, props<{ payload: { toggledTodo: Todo } }>());
export const createTodoStateAction = createAction(AppActionsType.TODO_CREATE, props<{ payload: { toCreate: Todo } }>());
export const createTodoSuccessStateAction = createAction(AppActionsType.TODO_CREATE_SUCCESS, props<{ payload: { created: Todo } }>());
