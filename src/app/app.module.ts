import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { appTodosReducer } from './store-conf/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store-conf/app.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot({ todos : appTodosReducer }, {}),
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
