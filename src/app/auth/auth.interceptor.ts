import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService)
    const token = authService.token
    const router = inject(Router)

    if(!token) return next(req)

    addToken(req, token)

    return next(addToken(req, token)).pipe(
        catchError(error => {
            if(error.status === 403){
                refreshAndProceed(authService, req, next)
            }

            //router.navigate(['/login'])
            return throwError(() => error)
        })
    )
}   

const refreshAndProceed = (
    authService: AuthService, 
    req: HttpRequest<any>, 
    next: HttpHandlerFn) => 
{
    return authService.refreshAuthToken().pipe(
        switchMap(res => {
            return next(addToken(req, res.access_token))
        })
    )
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}
