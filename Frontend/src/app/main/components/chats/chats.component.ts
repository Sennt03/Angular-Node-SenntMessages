import { Component, Input, OnInit } from '@angular/core';
import { LsChat } from 'src/app/core/models/chat.model';
import { LsUser } from 'src/app/core/models/user.model';
import { AuthService } from '@services/auth.service';
import { ChatService } from '@services/chat.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SaveChatsAction } from 'src/app/store/chats.actions';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  @Input('updateChats') updateChats: Observable<any>

  chats: LsChat[]
  user: LsUser

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    // Por que no lo necesito actualizado y el id nunca cambiara solo lo asigno de una vez
    this.user = this.authService.getMyUser()
    this.updateChats.subscribe(res => {
      this.user = this.authService.getMyUser()
      this.getChats()
    })
    this.getChats()
    this.subcribeChats()
  }

  getUser(users: LsUser[]){
    return users.find(user => user._id != this.user._id)
  }

  getChats(){
    this.chatService.getAllChats().subscribe(chats => {
      this.store.dispatch(new SaveChatsAction(chats))
    })
  }

  subcribeChats(){
    this.store.select('chats').subscribe(chats => {
      this.chats = this.chatService.sortChats([...chats])
    })
  }

}
