import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todo } from 'src/app/shared/models/todo';

describe('TodoService', () => {
  let service: TodoService;
  let controller: HttpTestingController;
  
  const todoList: Todo[] = [{
    id: 0,
    title: "Contact Product Owner for roadmap",
    done: false
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('create', () => {
    expect(service).toBeTruthy();
  });

  it('search for todos', () => {
    let retrievedList = [];
    service.getTodos().subscribe(
      (list) => {
        retrievedList = list;
      }
    );

    const request = controller.expectOne('/mytodos/all');
    console.log(request);
    request.flush(todoList);
    
    expect(retrievedList.length).toBe(todoList.length);
  });

  it('create todo', () => {
    let toCreate: Todo = {
      id: undefined,
      title: 'New Todo',
      description: 'test',
      done: false
    };

    let created: Todo|undefined;
    service.createTodo(toCreate).subscribe(
      (todo) => {
        created = todo;
      }
    );

    const request = controller.expectOne('/todo');
    console.log(request);
    request.flush({...toCreate, id:15});
    
    expect(created?.title).toBe(toCreate.title);
  });
});
