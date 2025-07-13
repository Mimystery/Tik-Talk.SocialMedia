import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  login(payload: {username: string, password: string}){
    const fd = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)
    return this.http.post('https://icherniakov.ru/yt-course/auth/token', fd)
    
  }
}
