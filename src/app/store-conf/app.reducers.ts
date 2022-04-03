import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { initialState } from './app.state';

export const appTodosReducer = createReducer(
  initialState,
  on(AppActions.loadTodosSuccessAction, (state, { payload }) => {
    let doneTodos = payload.todos.filter(obj => obj.done);
    let undoneTodos = payload.todos.filter(obj => !obj.done);
    return ({ ...state, todos: doneTodos.concat(undoneTodos)})
  }),
  // TODO Call backend service to update todo item
  on(AppActions.toggleTodoStateAction, (state, { payload }) => {
    // todo which state has changed
    let toggledTodo = payload.toggledTodo;

    // Put at end of list if going switching from done to undone
    let newTodos = state.todos.filter(obj => { return obj.title !== toggledTodo.title });
    if (!toggledTodo.done) {
      newTodos.push(toggledTodo);
    } else {
      newTodos.unshift(toggledTodo);
    }

    return ({ ...state, todos: newTodos })
  })

);