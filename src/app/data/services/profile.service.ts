import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  me!: Profile

  getTestAccounts(){
    return this.http.get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts')
  }

  getMe(){
    return this.http.get<Profile>('https://icherniakov.ru/yt-course/account/me')
    .pipe(
      tap(res => this.me = res)
    )
  }

  getSubscribersShortList(){
    return this.http.get<Pageble<Profile>>('https://icherniakov.ru/yt-course/account/subscribers/')
    .pipe(
      map(res => res.items.slice(0, 3))
    )
  }

}
