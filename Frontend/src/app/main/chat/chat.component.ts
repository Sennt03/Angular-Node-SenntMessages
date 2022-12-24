import { Component, OnInit, OnDestroy } from '@angular/core';
import { LsEventOpenAlert } from 'src/app/core/models/alerts.models';
import { sendAlert } from '@shared/utils/alerts';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '@services/message.service';
import { LsMessage } from '@models/message.model';
import { LsUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AddMessageAction, DeleteMessagesAction, ReadMessagesAction, SaveMessagesAction, UpdateMessageAction } from 'src/app/store/messages.actions';
import { ChangeLastMessageAction, ReadChangeChatAction, UpdateBlockChatAction, UpdateChat } from 'src/app/store/chats.actions';
import { ChatService } from '@services/chat.service';
import { environment } from 'src/environments/environment';
import { SocketService } from '@services/socket.service';

import { saveAs } from 'file-saver';
import { LsChat } from '@models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  inputId = Date.now()
  url_base = environment.url_base

  imgDefault = environment.imgDefault
  haveImage: boolean = false

  eventOpenAlert = new Subject<LsEventOpenAlert>();
  storeSuscription: Subscription
  subReadMessages: Subscription
  subListenMessages: Subscription
  subListenBlockChat: Subscription
  subListenUnlockChat: Subscription

  observeFinalSub: IntersectionObserver
  divFinal: HTMLElement

  user: LsUser
  chatUser: LsUser
  chat: LsChat
  chatId: string
  messages: LsMessage[]

  message_option: any = {}
  traslating = false

  constructor(
    public messageService: MessageService,
    private chatService: ChatService,
    private authService: AuthService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    // private modalController: ModalController
  ) {
    this.user = this.authService.getMyUser()
    this.getMessages()
    this.loadChatInfo()
    this.listenReadMessages()
    this.listenMessages()
    this.listenBlockAndUnblock()
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.storeSuscription.unsubscribe()
    // if(this.observeFinalSub) this.observeFinalSub.unobserve(this.divFinal)
    this.subReadMessages.unsubscribe()
    this.subListenMessages.unsubscribe()
    this.subListenBlockChat.unsubscribe()
    this.subListenUnlockChat.unsubscribe()
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

  observeFinal(){
    this.scroll()
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
        }else{
          setTimeout(() => {
            this.scroll()
          }, 200);
        }
      })
      this.observeFinalSub.observe(this.divFinal)
    }else if(!dontHave){
      setTimeout(() => {
        this.observeFinal()
      }, 200);
    }
  }

  // CHAT
  getChatUser(){
    this.chatService.getFromUser(this.chatId).subscribe(res => {
      this.chatUser = res
    })
  }

  loadChatInfo(){
    this.chatService.getChatInfo(this.chatId).subscribe(chat => {
      this.chat = chat
    }, err => {
      this.router.navigate(['/'])
    })
  }

  listenBlockAndUnblock(){
    this.subListenBlockChat = this.socketService.listen(environment.events.CHAT_BLOCKED).subscribe(res => {
      this.store.dispatch(new UpdateBlockChatAction({chatId: res._id, block: res.blocked}))
      this.chat = res
    })
    this.subListenUnlockChat = this.socketService.listen(environment.events.CHAT_UNLOCKED).subscribe(res => {
      this.store.dispatch(new UpdateBlockChatAction({chatId: res._id}))
      this.chat = res
    })
  }

  blockChat(){
    this.chatService.blockChat(this.chatId).subscribe(res => {
      this.store.dispatch(new UpdateBlockChatAction({chatId: res._id, block: res.blocked}))
      this.chat = res
    })
  }

  unlockChat(){
    this.chatService.unlockChat(this.chatId).subscribe(res => {
      this.chat = res
      this.store.dispatch(new UpdateBlockChatAction({chatId: res._id}))
    })
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
      
      // const translate = translateMessages()
      // if(translate){
      //   this.translateMessages(translate, messages)
      // }
    })
  }

  getSize(imageSize: string){
    const imageSizeNum = parseInt(imageSize)
    const size = Math.round(imageSizeNum / 1000)
      if(imageSizeNum > 1000000){
        return `${size} MB`
      }else{
        return `${size} kB`
      }
  }

  downloadDoc(messageId, docName, idIcon){
    sendAlert(this.eventOpenAlert, 'Downloading')
    // document.getElementById(idIcon).classList.add('animate__fadeInDown')
    // document.getElementById(idIcon).classList.add('animate__flipInX')
    // document.getElementById(idIcon).classList.add('animate__rotateIn')
    // document.getElementById(idIcon).classList.add('animate__zoomIn')
    document.getElementById(idIcon).classList.add('animate__zoomOut')
    this.messageService.downloadDoc(messageId).subscribe(res => {
      let blob = new Blob([res])
      saveAs(blob, docName)
    })
  }

  // translateMessages(language, messages: LsMessage[]){
  //   this.traslating = true
  //   this.messageService.translateMessages(language, messages).subscribe(res => {
  //       this.traslating = false
  //       this.messages = res
  //       this.store.dispatch(new SaveMessagesAction({chatId: this.chatId, messages: this.messages}))
        
  //       setTimeout(() => {this.scroll()}, 0);
  //   })
  // }

  sendMessage(data: {message: string, image?: File, isAudio?: boolean, isLocation?: boolean}){
    const message = data.message.trim()
    if(data?.isLocation){
      this.messageService.sendMessage({message: 'location', chatId: this.chatId, isLocation: data.isLocation}).subscribe(newMessage => {
        this.store.dispatch(new ChangeLastMessageAction({myuser: this.user, message: newMessage}))
        this.store.dispatch(new AddMessageAction({chatId: this.chatId, message: newMessage}))
        this.scroll()
      })
    }else{
      if(!data.image){
        if(message){
          const text = document.getElementById(this.inputId.toString()) as HTMLTextAreaElement;
          text.focus()
          this.messageService.sendMessage({message, chatId: this.chatId}).subscribe(newMessage => {
            this.store.dispatch(new ChangeLastMessageAction({myuser: this.user, message: newMessage}))
            this.store.dispatch(new AddMessageAction({chatId: this.chatId, message: newMessage}))
            this.scroll()
          })
        }
      }else{
        const formData = this.getFormData(data)
        if(data?.isAudio){
          formData.append('isAudio', `${data?.isAudio}`)
          sendAlert(this.eventOpenAlert, 'Sending audio...', false)
        }else{
          sendAlert(this.eventOpenAlert, 'Sending image...', false)
        }
        this.messageService.sendImage(formData).subscribe(newMessage => {
          sendAlert(this.eventOpenAlert, 'successfully uploaded', true)
          this.store.dispatch(new ChangeLastMessageAction({myuser: this.user, message: newMessage}))
          this.store.dispatch(new AddMessageAction({chatId: this.chatId, message: newMessage}))
          this.scroll()
        }, err => {
          sendAlert(this.eventOpenAlert, err)
        })
      }
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
    if(this.messages){
      const noRead = this.messages.filter(message => !message?.read && message.to == this.user._id)
      if(noRead.length > 0){
        this.messageService.readMessages(this.chatId).subscribe(res => {})
        this.store.dispatch(new ReadChangeChatAction({chatId: this.chatId, userId: this.user._id}))
      }else{
        this.store.dispatch(new ReadChangeChatAction({chatId: this.chatId,userId: this.user._id}))
      }
    }else{
      setTimeout(() => {
        this.readMessages()
      }, 600);
    }
  }

  listenMessages(){
    this.subListenMessages = this.socketService.listen(environment.events.NEW_MESSAGE).subscribe(res => {
      if(res.to == this.user._id){
        this.readMessages()
      }
    })
  }

  listenReadMessages(){
    this.subReadMessages = this.socketService.listen(environment.events.READ_MESSAGES).subscribe(res => {
      this.store.dispatch(new ReadChangeChatAction({chatId: res.chatId}))   
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

  // OPTIONS MESSAGE
  openMessageMenu(messageId: string, from, message, button:HTMLButtonElement){
    this.message_option.id = messageId
    this.message_option.from = from
    this.message_option.message = message
    button.click()
  }

  deleteMessage(){
    const confirm = window.confirm('Delete message?')
    if(confirm){
      sendAlert(this.eventOpenAlert, 'Deleting message', false)
      this.messageService.deleteMyMessage(this.message_option.id).subscribe(res => {
        this.store.dispatch(new DeleteMessagesAction({messageId: this.message_option.id, chatId: this.chatId}))
        this.store.dispatch(new UpdateChat({chatId: this.chatId, messages: this.messages, myUserId: this.user._id}))
        sendAlert(this.eventOpenAlert, 'Message deleted')
      })
    }
  }

  translateMessage(){
    try{
      const language = JSON.parse(localStorage.getItem('language'))
      const abr = language.abr
      abr.trim()
      if(language){
        sendAlert(this.eventOpenAlert, 'Translating message. This may take a few seconds', false)
        this.messageService.translateMessages(JSON.stringify(language), [this.message_option]).subscribe((res: any) => {
          sendAlert(this.eventOpenAlert, 'Translated message')
          console.log(res)
          this.store.dispatch(new UpdateMessageAction({message: res[0].message, messageId: res[0].id, chatId: this.chatId}))
        })
      }else{ this.turnOnTranslate() }
    }catch{
      this.turnOnTranslate()
    }
  }

  turnOnTranslate(){
    localStorage.removeItem('language')
    sendAlert(this.eventOpenAlert, 'Turn on translation in settings')
  }

  // MODAL
  async showContactProfile(){
    // const modal = await this.modalController.create({
    //   component: ContactInfoModalComponent,
    //   cssClass: 'modal_contact_info',
    //   componentProps: {
    //     contact: this.chatUser,
    //     messages: this.messages
    //   }
    // })

    // // modal.onDidDismiss().then(dataSong => {
    // //   if(this.currentSong.pause){
    // //     this.currentSong.pause()
    // //   }
    // //   this.same = false
    // //   this.currentSong.currentTime = null
    // //   this.song = dataSong.data
    // // })

    // modal.present();
  }

}
