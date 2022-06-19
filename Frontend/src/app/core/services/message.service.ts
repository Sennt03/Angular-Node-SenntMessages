import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservableInput, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '@services/auth.service';
import { LsDataNewMessage, LsMessage, LsSendMessage } from '@models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = `${environment.url_api}/message`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMessages(chatId): Observable<LsMessage[]>{
    return this.http.get<LsMessage[]>(`${this.url}/getAll/${chatId}`)
    .pipe(
      map(messages => {
        return this.sortMessages(messages)
      }),
      catchError(err => { return this.handleError(err) })
    )
  }

  sendMessage(data: LsSendMessage){
    return this.http.post<LsDataNewMessage>(`${this.url}/send`, data)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  sendImage(data){
    return this.http.post<LsDataNewMessage>(`${this.url}/sendFile`, data)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  readMessages(chatId: string){
    return this.http.get(`${this.url}/readMessages/${chatId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }



  // Handle error
  private handleError(err: HttpErrorResponse): ObservableInput<any>{
    if(err.status === 401){
      this.authService.logout()
      return throwError('Unauthorized')
    }
    return throwError('Error unexpected')
  }

  // Function to order chats en main
  private sortMessages(messages: LsMessage[]){
    messages.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1
    })
    return messages
  }

}