import { Component, OnInit, OnDestroy } from '@angular/core';
import { LsEventOpenAlert } from 'src/app/core/models/alerts.models';
import { sendAlert } from '@shared/utils/alerts';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '@services/message.service';
import { LsMessage } from '@models/message.model';
import { LsUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AddMessageAction, ReadMessagesAction, SaveMessagesAction } from 'src/app/store/messages.actions';
import { ChangeLastMessageAction, ReadChangeChatAction } from 'src/app/store/chats.actions';
import { ChatService } from '@services/chat.service';
import { environment } from 'src/environments/environment';
import { SocketService } from '@services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  imgDefault = environment.imgDefault
  haveImage: boolean = false

  eventOpenAlert = new Subject<LsEventOpenAlert>();
  storeSuscription: Subscription
  subReadMessages: Subscription
  subListeMessages: Subscription
  observeFinalSub: IntersectionObserver
  divFinal: HTMLElement

  user: LsUser
  chatUser: LsUser
  chatId: string
  messages: LsMessage[]

  constructor(
    private messageService: MessageService,
    private chatService: ChatService,
    private authService: AuthService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getMyUser()
    this.getMessages()
    this.listenReadMessages()
    this.listenMessages()
  }

  ngOnDestroy(): void {
    this.storeSuscription.unsubscribe()
    // if(this.observeFinalSub) this.observeFinalSub.unobserve(this.divFinal)
    this.subReadMessages.unsubscribe()
    this.subListeMessages.unsubscribe()
  }
  
  scroll(){
    const main = document.querySelector('main')
    if(main){
      main.scrollTop = main.scrollHeight
    }else{
      setTimeout(() => {
        this.scroll()
      }, 200);
    }
  }

  isInit(message: LsMessage): boolean{
    const i = this.messages.findIndex(find => find._id == message._id)
    if(i > 0){
      const last = this.messages[i - 1]
      const actual = message
      return (last.from != this.user._id && actual.from == this.user._id) 
      || (last.to != this.user._id && actual.to == this.user._id)
    }else{
      return true
    }
  }

  call(){
    sendAlert(this.eventOpenAlert, 'Coming soon')
  }

  getChatUser(){
    this.chatService.getFromUser(this.chatId).subscribe(res => {
      this.chatUser = res
    })
  }

  observeFinal(){
    this.divFinal = document.querySelector('.final_message')
    const dontHave = document.querySelector('.noMessages')
    if(this.divFinal && !dontHave){
      this.observeFinalSub = new IntersectionObserver((entries) => {
        const divs: any = document.querySelectorAll('.message div')
        if(entries[0].isIntersecting){
          divs.forEach(div => {
            div.style.visibility = 'visible'
            this.observeFinalSub.unobserve(this.divFinal)
          });
        }
      })
      this.observeFinalSub.observe(this.divFinal)
    }else if(!dontHave){
      setTimeout(() => {
        this.observeFinal()
      }, 200);
    }
  }


  // MESSAGES
  loadMessages(){
    this.storeSuscription = this.store.select('messages').subscribe(res => {
      const chat = res.find(chat => chat.chatId == this.chatId)
      if(chat){
        this.messages = chat.messages
        setTimeout(() => {this.observeFinal()}, 0);
        setTimeout(() => {this.scroll()}, 0);
      }
    })
  }

  getMessages(){
    // Evitamos doble subscribe
    this.route.params.pipe(
      switchMap((params: Params) => {
        if(this.chatId) this.ngOnDestroy()
        let listen = false
        if(this.chatId) listen = true
        this.chatId = params['id']
        if(listen) this.listenReadMessages()
        if(listen) this.listenMessages()
        this.readMessages()
        this.getChatUser()
        return this.messageService.getMessages(params['id'])
      })
    ).subscribe(messages => {
      // Cargar mensajes comprobando si hay mensajes en el store
      this.messages = messages
      this.store.dispatch(new SaveMessagesAction({chatId: this.chatId, messages}))
      this.loadMessages()
      
      setTimeout(() => {this.scroll()}, 0);
    })
  }

  sendMessage(data: {message: string, image?: File}){
    const message = data.message.trim()
    if(!data.image){
      if(message){
        this.messageService.sendMessage({message, chatId: this.chatId}).subscribe(newMessage => {
          this.store.dispatch(new ChangeLastMessageAction({myuser: this.user, message: newMessage}))
          this.store.dispatch(new AddMessageAction({chatId: this.chatId, message: newMessage}))
          this.scroll()
        })
      }
    }else{
      const formData = this.getFormData(data)
      sendAlert(this.eventOpenAlert, 'Sending image...', false)
      this.messageService.sendImage(formData).subscribe(newMessage => {
        sendAlert(this.eventOpenAlert, 'successfully uploaded', true)
        this.store.dispatch(new ChangeLastMessageAction({myuser: this.user, message: newMessage}))
        this.store.dispatch(new AddMessageAction({chatId: this.chatId, message: newMessage}))
        this.scroll()
      })
    }
  }

  getFormData(data){
    const formData = new FormData()
    formData.append('file', data.image)
    formData.append('chatId', this.chatId)
    if(data.message.trim()){
      formData.append('message', data.message)
    }
    return formData
  }

  readMessages(){
    this.messageService.readMessages(this.chatId).subscribe(res => {})
    this.store.dispatch(new ReadChangeChatAction({chatId: this.chatId}))
  }

  listenMessages(){
    this.subListeMessages = this.socketService.listen(environment.events.NEW_MESSAGE).subscribe(res => {
      this.readMessages()
    })
  }

  listenReadMessages(){
    this.subReadMessages = this.socketService.listen(environment.events.READ_MESSAGES).subscribe(res => {
      if(res.chatId == this.chatId){
        this.store.dispatch(new ReadMessagesAction({chatId: this.chatId}))
      }
    })
  }

  // IMAGE
  sendAlert(e: string){
    sendAlert(this.eventOpenAlert, e)
  }

  viewPhoto(image_class: string){
    document.querySelector('.'+image_class).classList.toggle('active')
  }

}
