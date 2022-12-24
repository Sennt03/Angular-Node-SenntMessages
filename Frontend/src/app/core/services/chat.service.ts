import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, ObservableInput, throwError } from 'rxjs';
import { LsChat, LsGetChatId } from '@models/chat.model';
import { AuthService } from '@services/auth.service';
import { LsUser } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = `${environment.url_api}/chat`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllChats(): Observable<LsChat[]>{
    return this.http.get<LsChat[]>(this.url)
    .pipe(
      // Cambiar los ids de forma dinamica para escalar en un futuro y crear grupos
      map(chats => {
        // Eliminar chats que no cree yo y no tienen mensajes
        chats = this.cleanChats(chats)
        // Ordenar los chats por el mensaje mas reciente
        return this.sortChats(chats)
      }),
      catchError(err => { return this.handleError(err) })
    )
  }

  getChatId(to: string): Observable<LsChat>{
    return this.http.post<LsGetChatId>(`${this.url}/getChatId`, {to})
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  getChatInfo(chatId): Observable<LsChat>{
    return this.http.get<LsChat>(`${this.url}/${chatId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  blockChat(chatId): Observable<LsChat>{
    return this.http.get<LsChat>(`${this.url}/block/${chatId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  unlockChat(chatId): Observable<LsChat>{
    return this.http.get<LsChat>(`${this.url}/unlock/${chatId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  getFromUser(chatId: string): Observable<LsUser>{
    return this.http.get<LsUser>(`${this.url}/getFromUser/${chatId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  private handleError(err: HttpErrorResponse): ObservableInput<any>{
    if(err.status === 401){
      this.authService.logout()
      return throwError('Unauthorized')
    }
    return throwError('Error unexpected')
  }


  // Funcitons
  sortChats(chats: LsChat[]){
    chats.sort((a, b) => {
      if(a.lastMessage){
        if(b.lastMessage){
          return a.lastMessage.updatedAt > b.lastMessage.updatedAt ? -1 : 1
        }else{
          return a.lastMessage.updatedAt > b.createdAt ? -1 : 1
        }
      }else{
        if(b.lastMessage){
          return a.updatedAt > b.lastMessage.updatedAt ? -1 : 1
        }else{
          return a.updatedAt > b.createdAt ? -1 : 1
        }
      }
    })
    return chats
  }

  private cleanChats(chats: LsChat[]): LsChat[]{
    const user = this.authService.getMyUser()
    const cleanChats = chats.filter(chat => chat.lastMessage || (chat.users[0]._id == user._id))
    return cleanChats
  }

}