import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from 'src/app/shared/models/todo';
import { SharedModule } from 'src/app/shared/shared.module';
import { createTodoStateAction } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';

import { TodoEditionComponent } from './todo-edition.component';

describe('TodoEditionComponent', () => {
  let component: TodoEditionComponent;
  let fixture: ComponentFixture<TodoEditionComponent>;

  const todoList: Todo[] = [{
    id: 0,
    title: "Contact Product Owner for roadmap",
    done: false
  }];
  
  let store: MockStore<AppState>;
  const initialState :AppState = { todos: todoList };
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoEditionComponent ],
      imports: [
        SharedModule,
        NoopAnimationsModule
      ],
      providers:[
        { provide: MatDialogRef, useValue: { close: ()=>{}} },
        provideMockStore({ initialState  })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create todo state', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();  

    component.validateEdition({
      id: undefined,
      title: 'Test',
      description: '',
      done: false
    });

    expect(dispatchSpy).toHaveBeenCalled();

    component.close();
  });
});
