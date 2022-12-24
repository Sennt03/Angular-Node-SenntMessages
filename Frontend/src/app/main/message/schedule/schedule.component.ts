import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LsEventOpenAlert } from '@models/alerts.models';
import { LsSchedule } from '@models/message.model';
import { LsUser } from '@models/user.model';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { MessageService } from '@services/message.service';
import { SocketService } from '@services/socket.service';
import { UserService } from '@services/user.service';
import { sendAlert } from '@shared/utils/alerts';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  inputId = Date.now()
  createActive = false

  schedules: LsSchedule[] = []

  minDate: Date;
  maxDate: Date;

  // USERS
  eventOpenAlert = new Subject<LsEventOpenAlert>();
  allUsers: LsUser[]
  user: LsUser
  users: LsUser[]
  userToSend: string = null
  searchSubscription: Subscription
  userssBlocked: string[] = []
  
  inputSearch = new FormControl()
  continue = false

  date: Date
  hour: string
  dataSend = {date: null, milisegundos: 0, userTo: null}

  subAddSchedule: Subscription
  subDeleteSchedule: Subscription

  constructor(
    private userService: UserService,
    private store: Store<AppState>,
    private authService: AuthService,
    private messageService: MessageService,
    private socketService: SocketService
  ) {
    this.listenSchedules()
    this.getSchedules()
    this.user = this.authService.getMyUser()
    this.getChats()
    this.getUsers()
    this.minDate = new Date()
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 8)
    this.maxDate = maxDate
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    this.hour = `${hours}:${minutes}`
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subAddSchedule.unsubscribe()
    this.subDeleteSchedule.unsubscribe()
  }

  getSchedules(){
    this.messageService.getAllSchedules().subscribe(res => {
      this.schedules = res
    })
  }

  listenSchedules(){
    this.subAddSchedule = this.socketService.listen(environment.events.SCHEDULE_ADDMESSAGE).subscribe(res => {
      this.schedules = [...this.schedules, res]
    })
    this.subDeleteSchedule = this.socketService.listen(environment.events.SCHEDULE_DELETEMESSAGE).subscribe(res => {
      if(res?.send){
        sendAlert(this.eventOpenAlert, 'A scheduled message has just been sent sent')
      }
      this.schedules = this.schedules.filter(schedule => schedule._id != res._id)
    })
  }

  // USERS

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
    document.getElementById('inputSearchSchedule').focus()
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


  // CREATE

  toggleCreate(){
    this.createActive = !this.createActive
    const con = document.querySelector('.con') as HTMLElement
    if(this.createActive){
      con.style.background = '#d2efff'
    }else{
      this.continue = false
      con.style.background = '#fff'
    }
  }

  continueValidate(){
    if(this.date && this.hour){
      const dateComp = new Date(this.date)
      const minDateComp = new Date(this.minDate)
      if(`${dateComp.getDate()}/${dateComp.getMonth() + 1}/${dateComp.getFullYear()}` == `${minDateComp.getDate()}/${minDateComp.getMonth() + 1}/${minDateComp.getFullYear()}`){
        const nowDate = new Date()
        const nowHour = `${nowDate.getHours()}:${nowDate.getMinutes()}`
        if(this.hour == nowHour){
          sendAlert(this.eventOpenAlert, 'You cannot select the same time and day today')
        }else{
          this.continueToggle()
        }
      }else{
        this.continueToggle()
      }
    }else{
      sendAlert(this.eventOpenAlert, 'Date and hour are required')
    }
  }

  continueToggle(){
    this.continue = true
    const date = new Date(this.date)
    let hour: any = this.hour.split(':')[0]
    let minutes: any = this.hour.split(':')[1]
    if(minutes.length < 1) minutes = `0${minutes}`
    minutes = parseInt(minutes)
    hour = parseInt(hour)
    date.setHours(hour, minutes)
    
    const fechaInicio = new Date().getTime();
    const fechaFin = new Date(date).getTime();
    let milisegundos = fechaFin - fechaInicio;
    if(milisegundos < 0) milisegundos = 0
    this.dataSend.milisegundos = milisegundos
    this.dataSend.date = date
  }

  cancelToggle(){
    this.userToSend = null
    this.continue = false
  }

  selectUser(e){
    this.userToSend = e
  }

  changeDate(e){
    this.date = e.value
  }

  changeHour(e){
    this.hour = e
  }

  sendAlertInput(e){
    sendAlert(this.eventOpenAlert, e)
  }

  sendMessage(data: {message: string, image?: File, isAudio?: boolean, isLocation?: boolean}){
    if(this.userToSend){
      const dataImage: any = data.image ? data.image : false
      let message = data.message.trim()
      if(message || (!message && dataImage) || data?.isLocation){
        if(data?.isLocation) message = 'location'
        sendAlert(this.eventOpenAlert, 'Scheduling message')
        this.dataSend.userTo = this.userToSend
        const dataFinal: any = {...this.dataSend, message, file: dataImage}
        if(data?.isAudio) dataFinal.isAudio = data?.isAudio
        this.messageService.sendSchedule(dataFinal, dataImage, data?.isLocation).subscribe(res => {
          this.schedules = [...this.schedules, res]
          this.cancelToggle()
          this.toggleCreate()
          sendAlert(this.eventOpenAlert, 'Scheduled message')
        }, err => sendAlert(this.eventOpenAlert, err))
      }
    }else{
      sendAlert(this.eventOpenAlert, 'Select a user')
    }
  }

  deleteSchedule(scheduleId){
    const comp = confirm('Delete message schedule?')
    if(comp){
      this.messageService.deleteSchedule(scheduleId).subscribe(res => {
        this.schedules = this.schedules.filter(schedule => schedule._id != res._id)
      })
    }
  }

}
