import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { GenericSubscriptionBase } from 'src/app/shared/generic/GenericSubscriptionBase';
import { Todo } from 'src/app/shared/models/todo';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent extends GenericSubscriptionBase implements OnInit {

  todos: Todo[] = []
  
  todos$: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router) { 
    super();
    this.todos$ = this.store.select(state => state.todos);
  }

  ngOnInit(): void {
    let subs = this.todos$.subscribe(
      list => {
        this.todos = list.todos || list;
        
        // Done for Demo.  TODO add a force refresh
        if(this.todos.length == 0){
          this.reloadTodos();
        }
      }
    );
    this.subscriptions.add(subs);

  }

  reloadTodos() {
    this.store.dispatch({ type: AppActionsType.LOAD });
  }

  toggleTodoState(todo: Todo){
     // toggle value
     let toggledTodo: Todo = {...todo, done: !todo.done}

    this.store.dispatch(
      {
          type: AppActionsType.TODO_STATE_TOGGLE, 
          payload: {toggledTodo}
      });
  }

  goToTodoDetail(todo: Todo) {
    //this.router.navigate([AppConfig.routing.mytodos.path + '/detail', { title: todo.title }]);
    this.router.navigate([AppConfig.routing.mytodos.path + '/detail/' + todo.id ]);
  }

}
