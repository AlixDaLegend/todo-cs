import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';



@NgModule({
  declarations: [
    TodoListComponent,
    TodoDetailComponent
  ],
  imports: [
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
