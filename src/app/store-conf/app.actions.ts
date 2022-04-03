import { createAction, props } from '@ngrx/store';
import { Todo } from '../shared/models/todo';

export enum AppActionsType {
    LOAD = '[App component] Load Todos',
    LOAD_SUCCESS = '[App component] Load Todos success',
    TODO_STATE_TOGGLE = '[App component] Toggle todo state'
}

export const loadTodosAction = createAction(AppActionsType.LOAD);
export const loadTodosSuccessAction = createAction(AppActionsType.LOAD_SUCCESS, props<{ payload: { todos: Todo[] } }>());
export const toggleTodoStateAction = createAction(AppActionsType.TODO_STATE_TOGGLE, props<{ payload: { toggledTodo: Todo } }>());
