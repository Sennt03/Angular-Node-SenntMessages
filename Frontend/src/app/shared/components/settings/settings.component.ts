import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LsEventOpenAlert } from '@models/alerts.models';
import { LsUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { closeAlert, sendAlert } from '@shared/utils/alerts';
import { availableLanguages } from '@shared/utils/langs';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  eventOpenAlert = new Subject<LsEventOpenAlert>();
  inputSearch = new FormControl()
  searchSubscription: Subscription
  langs: any[]
  active = false
  langActive: string
  
  share = false
  shareData: any = null
  user: LsUser

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    try{
      this.langActive = JSON.parse(localStorage.getItem('language')).lang
    }catch{
      localStorage.removeItem('language')
    }
    this.active = this.langActive ? true : false
    this.langs = Object.entries(availableLanguages)
    // Share location
    this.user = this.authService.getMyUser()
    if(this.user?.location?.latitud){
      this.share = true
      this.shareData = this.user.location
    }
  }

  ngOnInit() {}

  close(){
    const div_settings = document.getElementById('div_settings')
    div_settings.classList.add('animate__slideOutLeft')
    setTimeout(() => {
      div_settings.style.display = 'none'
      div_settings.classList.remove('animate__slideOutLeft')
    }, 500);
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
      this.searchSubscription = this.inputSearch.valueChanges.pipe(debounceTime(100))
      .subscribe(value => {
        if(value){
          const langs = this.langs.filter(lang => {
            const valueComp = value.toLowerCase()
            const langComp = lang[1].toLowerCase()
            if(langComp.includes(valueComp)){
              return lang
            }else return false
          })
          this.langs = langs
        }else{
          this.langs = Object.entries(availableLanguages)
        }
      })
    }else{
      this.searchSubscription.unsubscribe()
    }
  }

  selectLang(lang){
    localStorage.setItem('language', JSON.stringify({lang: lang[1], abr: lang[0]}))
    this.langActive = lang[1]
    sendAlert(this.eventOpenAlert, `Messages language updated to ${lang[1]} successfully`)
  }

  toggleActive(e){
    this.active = e.checked
    if(!this.active){
      localStorage.removeItem('language')
    }else{
      this.selectLang(['en', 'English'])
    }
  }

  toggleShare(e){
    this.share = e.checked
    if(!this.share){
      this.shareData = null
      sendAlert(this.eventOpenAlert, 'Removing location')
      this.userService.deleteLocation().subscribe(res => {
        console.log(res)
        closeAlert(this.eventOpenAlert)
        this.shareData = null
        this.authService.updateAuthUser(res)
      })
    }else{
      sendAlert(this.eventOpenAlert, 'Getting and sending location')
      this.userService.getPosition().then(res => {
        const location: any = {longitud: res.coords.longitude, latitud: res.coords.latitude}
        this.userService.updateLocation(location).subscribe(res => {
          closeAlert(this.eventOpenAlert)
          this.shareData = res.location
          this.authService.updateAuthUser(res)
        })
      }).catch(err => sendAlert(this.eventOpenAlert, 'Unable to record audio. Give microphone permission and try again'))
    }
  }

}
