import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Todo } from 'src/app/shared/models/todo';
import { TodoListComponent } from './todo-list.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/store-conf/app.state';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let controller: HttpTestingController;
  let compiledNativeElement: HTMLElement;

  
  const todoList: Todo[] = [{
    title: "Contact Product Owner for roadmap",
    done: false
  }];

  let store: MockStore<AppState>;
  const initialState :AppState = { todos: todoList };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [provideMockStore({ initialState  })],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    controller = TestBed.inject(HttpTestingController);
    compiledNativeElement = fixture.nativeElement as HTMLElement;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });



  it('retrieve todo list and display list items', () => {
    expect(component.todos.length).toBe(todoList.length);
    expect(compiledNativeElement.querySelectorAll('mat-list-item').length).toBe(todoList.length);
    
  });

  it('destroy all subscriptions', () => {
    expect(component['subscriptions'].closed).toBe(false);
    
    component.ngOnDestroy();

    expect(component['subscriptions'].closed).toBe(true);

  });
});
