import { Component, OnInit } from '@angular/core';
import { sendAlert } from '@shared/utils/alerts';
import { SaveChatsAction } from 'src/app/store/chats.actions';
import { AddMessageAction } from 'src/app/store/messages.actions';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { LsEventOpenAlert } from '@models/alerts.models';
import { LsUser } from '@models/user.model';
import { FormControl } from '@angular/forms';
import { UserService } from '@services/user.service';
import { MessageService } from '@services/message.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { ChatService } from '@services/chat.service';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent implements OnInit {

  inputId = Date.now()
  usersToSend: string[] = []
  eventOpenAlert = new Subject<LsEventOpenAlert>();
  allUsers: LsUser[]
  user: LsUser
  chatUser: LsUser
  users: LsUser[]
  inputSearch = new FormControl()
  searchSubscription: Subscription
  userssBlocked: string[] = []

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private store: Store<AppState>,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.user = this.authService.getMyUser()
    this.getChats()
    this.getUsers()
  }

  ngOnInit(): void {
    // this.getUsers()
  }

  getUsers(){
    this.userService.getAll().subscribe(users => {
      const filterUsers = users.filter(user => !this.userssBlocked.includes(user._id))
      this.users = filterUsers
      this.allUsers = filterUsers
    })
  }

  getChats(){
    this.store.select('chats').subscribe(chats => {
      chats.forEach(chat => {
        if(chat?.blocked?.from){
          const userBlocked = chat.users.filter(user => user._id != this.user._id)[0]
          this.userssBlocked.push(userBlocked._id)
        }
      });
    })
  }

  loading(open = true){
    const spinner = document.getElementById('loading')
    if(open){
      spinner.style.display = 'block'
    }else{
      setTimeout(() => {
        spinner.style.display = 'none'
      }, 1000);
    }
  }

  cleanSearch(){
    document.getElementById('inputSearchMultiple').focus()
    this.inputSearch.setValue('')
  }

  search(subscribe = true){
    if(subscribe){
      this.searchSubscription = this.inputSearch.valueChanges
      .pipe(debounceTime(100))
      .subscribe(value => {
        const users = this.allUsers
        .filter(user => {
          const name = user.name.toUpperCase()
          const username = user.username.toUpperCase()
          const search = value.toUpperCase()
          if(name.includes(search) || username.includes(search)){
            return user
          }else return false
        })
        this.users = users
      })
    }else{
      // if()
      this.searchSubscription.unsubscribe()
    }
  }

  toggleUserSelected(checked, userId){
    if(checked){
      this.usersToSend.push(userId)
    }else{
      this.users.filter(user => user != userId)
    }
  }

  sendMessage(data: {message: string, image?: File, isAudio?: boolean, isLocation?: boolean}){
    const totalUsers = this.usersToSend.length
    if(totalUsers > 1){
      const dataImage = data.image ? data.image : false
      let message = data.message.trim()
      if(message || (!message && dataImage) || data?.isLocation){
        const users = this.usersToSend
        if(data?.isLocation) message = 'location'
        sendAlert(this.eventOpenAlert, `Sending message to ${totalUsers} users`, false)
        this.messageService.sendMultipleMessage({users, message, file: dataImage}, dataImage, data?.isAudio, data?.isLocation).subscribe(res => {
          res.forEach(message => {
            this.store.dispatch(new AddMessageAction({chatId: message.chatId, message}))
          });
          sendAlert(this.eventOpenAlert, `Message sent to ${totalUsers} users successfully`)
          this.chatService.getAllChats().subscribe(chats => {
            this.store.dispatch(new SaveChatsAction(chats))
          })
        }, err => sendAlert(this.eventOpenAlert, err))
      }
    }else{
      sendAlert(this.eventOpenAlert, 'Select at least 2 users')
    }
  }

  sendAlertInput(e){
    sendAlert(this.eventOpenAlert, e)
  }

}
