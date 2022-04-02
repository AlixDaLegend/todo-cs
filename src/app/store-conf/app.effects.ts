import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../core/services/todo.service';
import { AppActionsType } from './app.actions';

@Injectable()
export class TodoEffects {
 
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionsType.LOAD),
    mergeMap(() => this.todoService.getTodos()
      .pipe(
        map(todos => ({ type: AppActionsType.SUCCESS, payload: {todos } })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}