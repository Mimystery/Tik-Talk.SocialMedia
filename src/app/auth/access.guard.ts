import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router";

export const canActivateAuth = () => {
    const isLoggedIN = inject(AuthService).isAuth;

    if(isLoggedIN){
        return true
    }

    return inject(Router).createUrlTree(['/login'])
}