import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { GenericSubscriptionBase } from 'src/app/shared/generic/GenericSubscriptionBase';
import { Todo } from 'src/app/shared/models/todo';
import { AppActionsType } from 'src/app/store-conf/app.actions';
import { AppState } from 'src/app/store-conf/app.state';

@Component({
  selector: 'app-todo-edition',
  templateUrl: './todo-edition.component.html',
  styleUrls: ['./todo-edition.component.scss']
})
export class TodoEditionComponent extends GenericSubscriptionBase implements OnInit {

  private editedTodo: Todo = {
    id: undefined,
    title: '',
    description: '',
    done: false
  }

  todoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    done: new FormControl('', Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<TodoEditionComponent>, private store: Store<AppState>,
    private actionsSubj: ActionsSubject) {
    super()
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.todoForm.get("title")?.setValue(this.editedTodo.title);
    this.todoForm.get("description")?.setValue(this.editedTodo.description);
    this.todoForm.get("done")?.setValue(this.editedTodo.done);
  }

  close() {
    this.dialogRef.close();
  }

  validateEdition(formValue: Todo) {
    let todoToCreate = this.editedTodo;

    todoToCreate.title = formValue.title;
    todoToCreate.description = formValue.description;
    todoToCreate.done = formValue.done;

    this.store.dispatch(
      {
        type: AppActionsType.TODO_CREATE,
        payload: { toCreate: todoToCreate }
      });

    this.subscriptions.add(
      this.actionsSubj.pipe(
        ofType(AppActionsType.TODO_CREATE_SUCCESS)
      ).subscribe(() => {
        this.dialogRef.close();
      })
    );

    // TODO create and subscribe to CREATE_ERRORS 
  }


}
