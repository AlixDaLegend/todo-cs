import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from 'src/app/shared/models/todo';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';
import { TodoEditionComponent } from './todo-edition.component';


describe('TodoEditionComponent', () => {
  let component: TodoEditionComponent;
  let fixture: ComponentFixture<TodoEditionComponent>;
  const actionsSubject: ActionsSubject = new ActionsSubject();
  
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
        NoopAnimationsModule,
        MatIconModule
      ],
      providers:[
        provideMockStore({ initialState  }),
        { provide: MatDialogRef, useValue: { close: ()=>{}} },
        { provide: ActionsSubject, useValue: actionsSubject }
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

  it('init wrong form ', () => {
    component.todoForm = new FormGroup({ });

    component.initForm();

    expect(component).toBeTruthy();
  });

  it('close', () => {
    let dialog: MatDialogRef<any,any> = TestBed.inject(MatDialogRef);
    
    const dialogRefCloseSpy = spyOn(dialog, 'close'); 

    component.close()

    expect(dialogRefCloseSpy).toHaveBeenCalled(); 
  });

  it('validate edition', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();  
   
    let dialog: MatDialogRef<any,any> = TestBed.inject(MatDialogRef);
    const dialogRefCloseSpy = spyOn(dialog, 'close').and.callThrough();  
    
    let created: Todo = {
      id: undefined,
      title: 'New Todo',
      description: 'test',
      done: false
    };

    // Validation
    component.validateEdition(created);
    tick(1000);
    expect(dispatchSpy).toHaveBeenCalled();
    
    // Success
    const action = { type: AppActionsType.TODO_CREATE_SUCCESS, payload: {created} }
    actionsSubject.next(action);
    
    //TODO make this work
    // tick(4000);
    // expect(dialogRefCloseSpy).toHaveBeenCalled(); 
  }));
});
