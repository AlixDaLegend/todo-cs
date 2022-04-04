import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../core/services/todo.service';
import { AppActionsType, createTodoStateAction } from './app.actions';

@Injectable()
export class TodoEffects {
 
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionsType.LOAD),
    mergeMap(() => this.todoService.getTodos()
      .pipe(
        map(todos => ({ type: AppActionsType.LOAD_SUCCESS, payload: {todos } })),
        catchError(() => EMPTY)
      ))
    )
  );

  createTodos$ = createEffect(() => this.actions$.pipe(
    ofType(createTodoStateAction),
    mergeMap(( action ) => this.todoService.createTodo(action.payload.toCreate)
      .pipe(
        map((todo) => {
          // TODO remove these ugly lines when mocking POST ok , or real Backend available 
          // Should simply be return ({ type: AppActionsType.TODO_CREATE_SUCCESS, payload: {todo} })
          console.log("Todo created : " + todo)
          let created = {...action.payload.toCreate};
          created.id = new Date().getMilliseconds();

          return ({ type: AppActionsType.TODO_CREATE_SUCCESS, payload: {created} })
        }),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}