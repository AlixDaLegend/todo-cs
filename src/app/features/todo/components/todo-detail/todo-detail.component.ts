import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GenericSubscriptionBase } from 'src/app/shared/generic/GenericSubscriptionBase';
import { Todo } from 'src/app/shared/models/todo';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent extends GenericSubscriptionBase implements OnInit {

  todoId: number | null = null;

  todo: Todo | undefined;
  todos$: Observable<any>;
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { 
    super();
    this.todos$ = this.store.select(state => state.todos);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    }

    let subs = this.todos$.subscribe(
      list => {
        let todoList:Todo[] = list.todos || list;
        if(todoList.length == 0){
          // TODO NgRx Effect to fetch single TODO from backend + reducer state
          this.store.dispatch({ type: AppActionsType.LOAD });
        }
        for(let t of todoList){
          if(t.id === this.todoId){
            this.todo = t;
            break;
          }
        }
      }
    );
    this.subscriptions.add(subs);
  }


  hasData() {
    return this.todo !== undefined;
  }

}

