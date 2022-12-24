import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LsField, LsUser } from '@models/user.model';
import { catchError, Observable, ObservableInput, throwError } from 'rxjs';
import { environment } from 'src/environments/environment'
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.url_api}/user`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProfile(): Observable<LsUser>{
    return this.http.get<LsUser>(this.url)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  getAll(): Observable<LsUser[]>{
    return this.http.get<LsUser[]>(`${this.url}/getAll`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  updateProfile(field: LsField, update: string): Observable<LsUser>{
    return this.http.post<LsUser>(`${this.url}/update/${field}`, {update})
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  isValidEmal(email: string){
    return this.http.post(`${this.url}/validateEmail`, { email })
  }

  updatePhoto(file, remove = false): Observable<LsUser>{
    if(remove){
      return this.http.post<LsUser>(`${this.url}/updateImage`, {remove: true})
    }else{
      return this.http.post<LsUser>(`${this.url}/updateImage`, file)
    }
  }

  updateLocation(location){
    return this.http.post(`${this.url}/updateLocation`, location)
    .pipe(catchError(err => { return this.handleError(err) }))
  }
  
  deleteLocation(){
    return this.http.delete(`${this.url}/deleteLocation`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(res => {
                // resolve({longitud: resp.coords.longitude, latitud: resp.coords.latitude});
                resolve(res);
            },
            err => {
                reject(err);
          });
    });
  }

  // getPosition(): Promise<any>{
  //   return Geolocation.getCurrentPosition()
  // }


  // Handle error
  private handleError(err: HttpErrorResponse): ObservableInput<any>{
    if(err.status === 401){
      this.authService.logout()
      return throwError('Unauthorized')
    }
    return throwError('Error unexpected')
  }

}
