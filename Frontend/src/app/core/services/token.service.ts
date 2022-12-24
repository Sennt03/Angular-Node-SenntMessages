import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpContextToken , HttpRequest, HttpHandler, HttpEvent, HttpContext } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '@services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(request.context.get(noToken) == true){
      return next.handle(request)
    }
    request = this.addToken(request)
    return next.handle(request)
  }

  private addToken(request: HttpRequest<any>){
    const token = this.authService.getToken()
    if(token){
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
          socketid: localStorage.getItem('socketId') || ''
        }
      })
      return request
    }
    return request
  }
}

const noToken = new HttpContextToken<boolean>(() => false)

export function noInterceptToken(){
	return new HttpContext().set(noToken, true)
}