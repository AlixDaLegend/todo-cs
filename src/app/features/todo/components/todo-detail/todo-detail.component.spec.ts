import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from 'src/app/shared/models/todo';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';

import { TodoDetailComponent } from './todo-detail.component';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  const todoList: Todo[] = [{
    id: 0,
    title: "Contact Product Owner for roadmap",
    done: false
  }];

  let store: MockStore<AppState>;
  const initialState :AppState = { todos: todoList };
  
  beforeEach(async () => {
    TestBed.overrideComponent(
      TodoDetailComponent,
      {
        set: {
          providers: [{
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  // get: (key: string) => {
                  //   switch (key) {
                  //     case 'id':
                  //       return 0;
                  //     default :
                  //       return 'N/A'
                  //   }
                  // }
                  get: () => 0
                },
              },
            },
          }]
        }
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ TodoDetailComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState  })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch to retrieve data', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();  

    store.setState({ todos: [] });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalled(); 
    expect(dispatchSpy).toHaveBeenCalledWith({ type: AppActionsType.LOAD });
  });

});
