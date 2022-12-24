import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
import { environment } from 'src/environments/environment';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{

  url = `${environment.url_api}`
  socket: Socket = this.ioSocket
  users = this.listen('connected')
  message = this.listen('message')

  constructor(
    private authService: AuthService
  ) {
    super({
      url: environment.socket_url,
      options: {
          query: {
              userId: JSON.parse(localStorage.getItem('auth')).user._id
          }
      }
    })
    this.socket = this.ioSocket
    this.getSocketId()
  }

  registerUser(userSocket){
    console.log('Tu socket:', userSocket)
  }

  getSocketId(){
    this.listen('connected').subscribe(res => {
      localStorage.setItem('socketId', res)
    })
    this.listen('disconnect').subscribe(res => {
      localStorage.removeItem('socketId')
    })
  }

  listen(event){
    const outEven = new EventEmitter()
    this.socket.on(event, res => outEven.emit(res))
    return outEven
  }

  override emit(event: string, payload){
    this.socket.emit(event, payload)
  }

}
