import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { filter, Subject, Subscription } from 'rxjs';
import { LsUser } from '@models/user.model'
import { SocketService } from '@services/socket.service';
import { environment } from 'src/environments/environment';
import { userDefault } from '../store/user.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AddMessageAction, DeleteMessagesAction } from '../store/messages.actions';
import { ChangeLastMessageAction, ReadChangeChatAction, SaveChatsAction } from '../store/chats.actions';
import { LsMessage } from '@models/message.model';
import { ChatService } from '@services/chat.service';
import { sendAlert } from '@shared/utils/alerts';
import { LsEventOpenAlert } from '@models/alerts.models';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  eventOpenAlert = new Subject<LsEventOpenAlert>();
  eventUpdateChats = new Subject<any>();
  eventUpdateProfileUser = new Subject<any>();
  eventUpdateUsers = new Subject<any>();
  subUrl: Subscription
  user: LsUser

  subDeleteMessage: Subscription
  subReadMessages: Subscription
  subDeleteSchedule: Subscription

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router,
    private socketService: SocketService,
    private store: Store<AppState>
    ) { 
      this.authService.saveInStore(userDefault, true)
      this.store.select('user').subscribe(user => {
        this.user = user
      })
    }

  ngOnInit(): void {
    window.addEventListener('resize', () => {this.appHeight()})
    this.appHeight()
    this.resize(this.router.url)
    this.subUrl = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.resize(event.url)
    });
    this.listenMessages()
    this.listenSchedules()
    this.eventUpdateChats.next(true)
    this.eventUpdateProfileUser.next(true)
    this.eventUpdateUsers.next(true)    
  }

  ngOnDestroy(): void {
    this.subUrl.unsubscribe()
    this.subDeleteMessage.unsubscribe()
    this.subReadMessages.unsubscribe()
    this.subDeleteSchedule.unsubscribe()
  }

  listenSchedules(){
    this.subDeleteSchedule = this.socketService.listen(environment.events.SCHEDULE_DELETEMESSAGE).subscribe(res => {
      if(res?.send){
        sendAlert(this.eventOpenAlert, 'A scheduled message has just been sent sent')
      }
    })
  }

  appHeight(){
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  resize(url){
    url = url.split('/')[1]
    if(url !== 'chat' && url !== 'message'){
      document.getElementById('chats-container').style.visibility = 'visible'
    }
  }

  logout(){
    this.authService.logout()
  }

  openProfile(){
    const div_profile = document.getElementById('div_profile')
    div_profile.style.display = 'block'
  }

  openSettings(){
    const div_settings = document.getElementById('div_settings')
    div_settings.style.display = 'block'
  }

  updateChats(){
    this.eventUpdateChats.next(true)
  }

  eventUpdateProfile(){
    this.eventUpdateProfileUser.next(true)
  }

  updateUsers(){
    this.eventUpdateUsers.next(true)
  }

  updateNoRead(message: LsMessage){
    if(!message.read && message.to == this.user._id){
      let chats: any[]
      this.store.select('chats').forEach(chatsStore => chats = chatsStore)
      let newChats = chats.filter(chat => chat._id != message.chatId)
      const oldChat = chats.find(chat => chat._id == message.chatId)
      const newChat = {
        ...oldChat,
        noRead: oldChat.noRead + 1
      }

      newChats.push(newChat)
      this.store.dispatch(new SaveChatsAction(this.chatService.sortChats(newChats)))
    }
  }

  thereChat(chatId){
    let chats: any[]
    this.store.select('chats').forEach(chatsStore => chats = chatsStore)
    return chats.find(chat => chat._id == chatId)
  }

  // SOCKET

  listenMessages(){
    this.socketService.listen(environment.events.NEW_MESSAGE).subscribe(res => {
      if(this.thereChat(res.chatId)){
        this.store.dispatch(new ChangeLastMessageAction({myuser: this.user, message: res}))
        this.store.dispatch(new AddMessageAction({chatId: res.chatId, message: res}))
        if(!res.noRead) this.updateNoRead(res)
      }else{
        this.updateChats()
      }
    })

    // Message Deleted
    this.subDeleteMessage = this.socketService.listen(environment.events.MESSAGE_DELETED).subscribe(messageDeleted => {
      this.store.dispatch(new DeleteMessagesAction({messageId: messageDeleted._id, chatId: messageDeleted.chatId}))
      let messages
      this.store.select('messages').forEach(chats => {
        chats.forEach(chat => {
          if(chat.chatId == messageDeleted.chatId){
            messages = chat.messages
            return
          }
        });
      })
        this.updateChats()
    })

    // READ MESSAGE
    this.subReadMessages = this.socketService.listen(environment.events.READ_MESSAGES).subscribe(res => {
      this.store.dispatch(new ReadChangeChatAction({chatId: res.chatId}))   
    })
  }
  
}
