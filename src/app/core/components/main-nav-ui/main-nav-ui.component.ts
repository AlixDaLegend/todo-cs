import { Component, Input, OnInit } from '@angular/core';
import { version } from 'src/environments/version';
import { NavLink } from '../../models/nav-link';

@Component({
  selector: 'app-main-nav-ui',
  templateUrl: './main-nav-ui.component.html',
  styleUrls: ['./main-nav-ui.component.scss']
})
export class MainNavUIComponent {

  @Input() 
  navLinks: NavLink[] = []
  
  title = 'TODO';
  appVersion: string;

  constructor() { 
    this.appVersion = version;
  }
}
