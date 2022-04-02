import { Component } from '@angular/core';
import { AppConfig } from './app.config';
import { NavLink } from './core/models/nav-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navLinks: NavLink[] = [];

  constructor(){
    this.navLinks = Object.values(AppConfig.routing)
  }
  
}
