import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';
import { TodoService } from 'src/app/core/services/todo.service';
import { GenericSubscriptionBase } from 'src/app/shared/generic/GenericSubscriptionBase';
import { Todo } from 'src/app/shared/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent extends GenericSubscriptionBase implements OnInit {

  todos: Todo[] = []
  
  todos$: Observable<any>;

  constructor(private todoService:TodoService, private store: Store<AppState>) { 
    super();
    this.todos$ = this.store.select(state => state.todos);
  }

  ngOnInit(): void {
    let subs = this.todos$.subscribe(
      list => {
        this.todos = list.todos || list;
      }
    );
    this.subscriptions.add(subs);

    this.reloadTodos();
  }

  reloadTodos() {
    /*
    let subs = this.todoService.getTodos().subscribe(
      list => {
        this.todos = list;
      }
    );

    this.subscriptions.add(subs);
    */
    this.store.dispatch({ type: AppActionsType.LOAD });
  }

}
