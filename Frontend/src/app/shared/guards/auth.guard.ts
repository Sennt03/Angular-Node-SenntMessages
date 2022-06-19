import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // Guard que valida que este logeado, valida que el token sea valido y de paso actualiza los datos
    return this.userService.getProfile().pipe(
      map(user => {
        this.authService.updateAuthUser(user)
          return true
      }),catchError(() => {
        this.authService.logout()
        this.router.navigate(['/auth/login'])
        return of(false);
      })
    )
  }

  
  
}
