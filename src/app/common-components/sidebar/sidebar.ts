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

}
