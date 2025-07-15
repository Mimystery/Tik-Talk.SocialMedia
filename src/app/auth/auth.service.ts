import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  route = inject(Router)

  token: string | null = null;
  refteshToken: string | null = null;

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('token')
      this.refteshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token;
  }

  login(payload: {username: string, password: string}){
    const fd = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)
    return this.http.post<TokenResponse>('https://icherniakov.ru/yt-course/auth/token', fd)
    .pipe(
      tap(val => this.saveTokens(val))
    )
  }
  refreshAuthToken() {
    return this.http.post<TokenResponse>('https://icherniakov.ru/yt-course/auth/refresh',
      {
        refresh_token: this.refteshToken,
      }).pipe(
        tap(res => this.saveTokens(res)),
        catchError(error => {
          this.logout()
          return throwError(() => error)
        })
      )
  }

  logout(){
    this.cookieService.deleteAll()
    this.token = null
    this.refteshToken = null
    this.route.navigate(['/login'])
  }

  saveTokens(res: TokenResponse){
    this.token = res.access_token;
    this.refteshToken = res.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refteshToken)
  }
}
