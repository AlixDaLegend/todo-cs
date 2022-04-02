import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './app.config';

const routes: Routes = [
  {path: AppConfig.routing.mytodos.path, loadChildren: () => import('./features/todo/todo.module').then(m => m.TodoModule)},
  {path: "**", redirectTo: AppConfig.routing.mytodos.path, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
