import { Component, inject } from '@angular/core';
import { SvgIcon } from "../svg-icon/svg-icon";
import { SubscriberCard } from "./subscriber-card/subscriber-card";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, SubscriberCard, RouterModule, AsyncPipe],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

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

  ngOnInit(){
    firstValueFrom(this.profileService.getMe())
  }
}
