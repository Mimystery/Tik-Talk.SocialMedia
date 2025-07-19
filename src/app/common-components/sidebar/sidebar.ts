import { Component } from '@angular/core';
import { SvgIcon } from "../svg-icon/svg-icon";

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  menuItems = [
    {
      label: 'Main page',
      icon: 'home',
      link: ''
    },
    {
      label: 'Chats',
      icon: 'chat',
      link: ''
    },
    {
      label: 'Search',
      icon: 'search',
      link: ''
    },
  ]
}
