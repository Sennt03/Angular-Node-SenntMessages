import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservableInput, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '@services/auth.service';
import { LsDataNewMessage, LsMessage, LsSchedule, LsSendMessage } from '@models/message.model';

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

  translateMessages(language: string, messages: LsMessage[]): Observable<LsMessage[]>{
    return this.http.post<LsMessage[]>(`${this.url}/translate`, {language, messages})
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  sendMessage(data: LsSendMessage){
    return this.http.post<LsDataNewMessage>(`${this.url}/send`, data)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  sendMultipleMessage(data: {users: string[], message: string, file?}, file, isAudio, isLocation){
    let formData
    if(isLocation){
      formData = {message: 'location', isLocation}
      formData.usersId = []
      data.users.forEach(user => {
        formData.usersId.push(user)
      });
    }else{
      formData = new FormData()
      data.users.forEach(user => {
        formData.append('usersId', user)
      });
      if(data.message.trim()) formData.append('message', data.message)
      if(file) formData.append('file', data.file)
      if(isAudio) formData.append('isAudio', isAudio)
      if(isLocation) formData.append('isLocation', isLocation)
    }
    return this.http.post<LsDataNewMessage[]>(`${this.url}/sendMultiple`, formData)
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

  deleteMyMessage(messageId: string){
    return this.http.get(`${this.url}/deleteMyMessage/${messageId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }
  
  downloadDoc(messageId){
    return this.http.get(`${this.url}/downloadDoc/${messageId}`, {responseType: 'blob'})
    .pipe(catchError(err => { return this.handleError(err) }))
  }


  // SCHEDULES
  getAllSchedules(): Observable<LsSchedule[]>{
    return this.http.get<LsSchedule[]>(`${this.url}/getSchedules`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }
  
  sendSchedule(data, file, isLocation?: any){
    let formData
    if(isLocation){
      formData = {userTo: data.userTo, milisegundos: data.milisegundos, date: data.date, message: 'location', isLocation}
    }else{
      formData = new FormData()
      formData.append('userTo', data.userTo)
      formData.append('milisegundos', data.milisegundos)
      formData.append('date', data.date)
      if(data.message.trim()) formData.append('message', data.message)
      if(file) formData.append('file', data.file)
      if(data?.isAudio) formData.append('isAudio', data?.isAudio)
      if(isLocation) formData.append('isLocation', isLocation)
    }
    return this.http.post(`${this.url}/scheduleMessage`, formData)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  deleteSchedule(scheduleId): Observable<LsSchedule>{
    return this.http.delete<LsSchedule>(`${this.url}/deleteSchedule/${scheduleId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }




  // Handle error
  private handleError(err: HttpErrorResponse): ObservableInput<any>{
    if(err.status === 401){
      this.authService.logout()
      return throwError('Unauthorized')
    }else if(err.error?.mymessage){
      return throwError(err.error?.mymessage)
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