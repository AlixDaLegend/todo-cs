import { createReducer, on } from '@ngrx/store';
import { Todo } from '../shared/models/todo';
import * as AppActions from './app.actions';
import { initialState } from './app.state';

export const appTodosReducer = createReducer(
  initialState,

  // on(AppActions.loadTodosSuccessAction, (state, { payload }) => {
  //   let doneTodos = payload.todos.filter(obj => obj.done);
  //   let undoneTodos = payload.todos.filter(obj => !obj.done);
  //   return ({ ...state, todos: doneTodos.concat(undoneTodos)})
  // }),

  on(AppActions.loadTodosSuccessAction, (state, { payload }) => {
    return ({ ...state, todos: payload.todos })
  }),

  // TODO Call backend service to update todo item
  on(AppActions.toggleTodoStateAction, (state, { payload }) => {
    // todo which state has changed
    let toggledTodo = payload.toggledTodo;

    let newTodos: Todo[] = [];

    // Put at end of list if switching from done to undone
    if (!toggledTodo.done) {
      newTodos = state.todos.filter(obj => { return obj.id !== toggledTodo.id });
      newTodos.push(toggledTodo);
    } else {
      // replace toogle Todo
      for (let t of state.todos) {
        if (t.id == toggledTodo.id) {
          newTodos.push(toggledTodo);
        } else {
          newTodos.push(t);
        }
      }
    }

    return ({ ...state, todos: newTodos })
  })

);