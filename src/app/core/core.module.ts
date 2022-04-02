import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SharedModule } from '../shared/shared.module';
import { MainNavUIComponent } from './components/main-nav-ui/main-nav-ui.component';



@NgModule({
  declarations: [
    MainNavUIComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot()
  ],
  exports: [
    MainNavUIComponent,
    NgHttpLoaderModule
  ]
})
export class CoreModule { }
