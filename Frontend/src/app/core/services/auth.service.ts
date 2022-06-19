import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LsFields, LsisAvaible, LsLogin, LsRegister, LsResAuth } from '@models/auth.models';
import { LsUser } from '@models/user.model';
import { catchError, Observable, ObservableInput, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { noInterceptToken } from '@services/token.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SaveUserAction } from 'src/app/store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.url_api}/auth`
  private noToken = { context: noInterceptToken() }

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  validateAvaible(data: string, field: LsFields): Observable<LsisAvaible>{
    return this.http.post<LsisAvaible>(`${this.url}/validate/${field}`, {value: data}, this.noToken)
  }

  register(data: LsRegister): Observable<LsResAuth>{
    return this.http.post<LsResAuth>(`${this.url}/register`, data, this.noToken)
  }

  login(data: LsLogin): Observable<LsResAuth>{
    return this.http.post<LsResAuth>(`${this.url}/login`, data, this.noToken)
  }

  saveInStore(user: LsUser, isNew = false){
    if(isNew){
      user = this.getMyUser()
    }
    this.store.dispatch(new SaveUserAction(user))
  }

  saveAuth(data: LsResAuth){
    localStorage.setItem('auth', JSON.stringify(data))
    this.saveInStore(data.user)
  }

  getAuth(): LsResAuth | boolean{
    try{
      return JSON.parse(localStorage.getItem('auth'))
    }catch{
      this.logout()
      return false
    }
  }

  getMyUser(): LsUser{
    const auth: any = this.getAuth()
    return auth?.user
  }

  getToken(): string{
    const auth: any = this.getAuth()
    return auth?.token
  }

  loggedIn(){
    const token = this.getAuth() as LsResAuth
    return token ? true : false
  }

  logout(){
    localStorage.removeItem('auth')
    this.router.navigate(['/auth/login'])
  }

  updateAuthUser(user: LsUser){
    try{
      const auth = JSON.parse(localStorage.getItem('auth'))
      auth.user = user
      localStorage.setItem('auth', JSON.stringify(auth))
      this.saveInStore(user)
    }catch{
      this.logout()
    }
  }

  changePassword(actual, newPassword){
    return this.http.post(`${this.url}/changePassword`, { actual, newPassword })
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  private handleError(err: HttpErrorResponse): ObservableInput<any>{
    if(err.status === 401){
      this.logout()
      return throwError('Unauthorized')
    }
    return throwError('Error unexpected')
  }

}
