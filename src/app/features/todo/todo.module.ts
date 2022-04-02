import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
