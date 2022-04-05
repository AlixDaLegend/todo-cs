import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppConfig } from 'src/app/app.config';
import { Todo } from 'src/app/shared/models/todo';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let controller: HttpTestingController;
  let compiledNativeElement: HTMLElement;
  let router: Router;
  
  const todoList: Todo[] = [{
    id: 0,
    title: "Contact Product Owner for roadmap",
    done: false
  }];

  let store: MockStore<AppState>;
  const initialState :AppState = { todos: todoList };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        HttpClientTestingModule, 
        SharedModule,
        RouterTestingModule.withRoutes(
          [{path: AppConfig.routing.mytodos.path + '/detail', component: TodoDetailComponent}]
        )  
      ],
      providers: [provideMockStore({ initialState  })]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    controller = TestBed.inject(HttpTestingController);
    compiledNativeElement = fixture.nativeElement as HTMLElement;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });



  it('retrieve todo list and display list items', () => {
    expect(component.todos.length).toBe(todoList.length);
    expect(compiledNativeElement.querySelectorAll('mat-list-item').length).toBe(todoList.length);
    
  });

  it('toggle todo state', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();  

    component.toggleTodoState(todoList[0]);
    //expect(dispatchSpy).toHaveBeenCalledWith(toggleTodoStateAction);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('go to todo detail', () => {
    let todo = todoList[0];
    const navigateSpy = spyOn(router, 'navigate');    
    component.goToTodoDetail(todo);
    expect(navigateSpy).toHaveBeenCalledWith([AppConfig.routing.mytodos.path + '/detail/'+ todo.id ]);
  });

  it('call dispatch to retrieve data if store empty', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();  

    store.setState({ todos: [] });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalled(); 
    expect(dispatchSpy).toHaveBeenCalledWith({ type: AppActionsType.LOAD });
  });

  it('open creation dialog', () => {
    let dialog: MatDialog = TestBed.inject(MatDialog);
    
    const dialogSpy = spyOn(dialog, 'open');  

    component.createNewTodo()

    expect(dialogSpy).toHaveBeenCalled(); 
  });

  it('destroy all subscriptions', () => {
    expect(component['subscriptions'].closed).toBe(false);
    
    component.ngOnDestroy();

    expect(component['subscriptions'].closed).toBe(true);

  });
});
