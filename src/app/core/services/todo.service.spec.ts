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
});
