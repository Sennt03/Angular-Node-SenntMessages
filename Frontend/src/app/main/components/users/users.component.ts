import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { LsUser } from 'src/app/core/models/user.model';
import { AuthService } from '@services/auth.service';
import { ChatService } from '@services/chat.service';
import { debounceTime, Subscription } from 'rxjs';
import { LsChat } from '@models/chat.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() chatsUpdated: EventEmitter<any> = new EventEmitter()

  allUsers: LsUser[]
  users: LsUser[]
  inputSearch = new FormControl()
  searchSubscription: Subscription

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getAll().subscribe(users => {
      this.users = users
      this.allUsers = users
    })
  }

  createChat(toId, chatId){
    if(!chatId){
      this.loading()
      this.chatService.getChatId(toId).subscribe(chat => {
        this.users.find(user => user._id == toId).chatId = chat._id
        this.chatsUpdated.emit()
        this.router.navigate([`/chat/${chat._id}`])
        this.loading(false)
      })
    }else{
      this.router.navigate([`/chat/${chatId}`])
    }
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
    document.getElementById('inputSearch').focus()
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
      this.searchSubscription.unsubscribe()
    }
  }


}
