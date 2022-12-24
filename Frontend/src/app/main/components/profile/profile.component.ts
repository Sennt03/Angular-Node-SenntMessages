import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LsUser } from 'src/app/core/models/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { MyValidators } from '@shared/utils/myValidators';
import { sendAlert } from '@shared/utils/alerts';
import { Observable, Subject } from 'rxjs';
import { LsEventOpenAlert } from '@models/alerts.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input('updateProfile') update: Observable<any>
  eventOpenAlert = new Subject<LsEventOpenAlert>();

  disabled = false

  formChangePassword: FormGroup
  loadingChange = false
  okChangedPassword = false
  
  user: LsUser
  name: FormControl
  username: FormControl
  email: FormControl

  hide = {one: true, two: true, three: true};
  showChangePassword = false
  errChangedPassword = false

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('user').subscribe(user => this.user = user)
    this.update.subscribe(res => {
      this.load()
    })
    this.load()
  }

  load(){
    this.loadUser()
    this.createChangePassword()
  }
  
  closeProfile(){
    const div_profile = document.getElementById('div_profile')
    div_profile.classList.add('animate__slideOutLeft')
    setTimeout(() => {
      div_profile.style.display = 'none'
      div_profile.classList.remove('animate__slideOutLeft')
    }, 500);
  }

  loadUser(){
    this.name = new FormControl({value: this.user.name, disabled: true}, [Validators.required, Validators.minLength(3)])
    this.username = new FormControl({value: this.user.username, disabled: true}, 
      [Validators.required, Validators.minLength(3)], MyValidators.validateUsername(this.authService))
    this.email = new FormControl({value: this.user.email, disabled: true}, 
      [Validators.required, Validators.email], [MyValidators.validateEmail(this.authService), MyValidators.emailIsValid(this.userService)])
  }

  toggleEdit(input, close = false, updated: string | boolean = false){
    if(close){
      input.value = updated ? updated : this.user[input.name]
      this[input.name].value = updated ? updated : this.user[input.name]
      input.disabled = true
      this[input.name].disable()
      this[input.name].markAsUntouched()
    }else{
      this[input.name].enable()
      input.disabled = false
      input.focus()
    }
  }

  toggleChangePassword(open = true){
    this.loadingChange = false
    this.errChangedPassword = false
    this.showChangePassword = open
  }

  save(input){
    const inputName = input.name
    const inputValue = this[inputName].value
    if(this[inputName].valid){
      if(inputValue != this.user[inputName]){
        this.toggleEdit(input, true, inputValue)
        this.userService.updateProfile(inputName, inputValue).subscribe(res => {
          this.saveUserUpdated(res)
        })
      }else{
        this.toggleEdit(input, true)
      }
    }
  }

  saveUserUpdated(userUpdated){
    const auth: any = this.authService.getAuth()
    const newAuth = { token: auth.token, user: userUpdated }
    this.authService.saveAuth(newAuth)
  }

  // CHANGE PASSWORD
  createChangePassword(){
    this.formChangePassword = this.formBuilder.group({
      actual: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, {
      validators: MyValidators.matchPasswords
    })
  }

  changePassword(){
    if(this.formChangePassword.valid){
      this.loadingChange = true
      const actual = this.formChangePassword.get('actual').value
      const newPassword = this.formChangePassword.get('password').value
      this.authService.changePassword(actual, newPassword).subscribe(res => {
        this.okChangedPassword = true
        this.loadingChange = false
        this.errChangedPassword = false
        this.cleanFormChangePassword()
      }, err => {
        this.errChangedPassword = true
        this.loadingChange = false
      })
    }else this.formChangePassword.markAllAsTouched()
  }

  cleanFormChangePassword(){
    this.formChangePassword.reset()
    this.formChangePassword.markAsUntouched()
    this.formChangePassword.clearValidators()
    this.toggleChangePassword(false)
    this.hide = {one: true, two: true, three: true};
    setTimeout(() => {
      this.okChangedPassword = false
    }, 5000);
  }

  get requiredChangePassword(){
    const actual = this.formChangePassword.get('actual')
    const password = this.formChangePassword.get('password')
    const password2 = this.formChangePassword.get('password2')
    return (actual.hasError('required') && actual.touched) 
    || (password.hasError('required') && password.touched)
    || (password2.hasError('required') && password2.touched)
  }

  get dontMatch(){
    return this.formChangePassword.hasError('match_password') && this.formChangePassword.get('password2').touched 
  }

  get minLength(){
    const password = this.formChangePassword.get('password')
    return password.hasError('minlength') && password.touched
  }

  // CHANGE PHOTO
  viewPhoto(url: string){
    window.open(url)
  }

  removePhoto(){
    if(!this.user.image.default || this.user.image.default != 'true'){
      sendAlert(this.eventOpenAlert, 'Removing profile picture...')
      this.userService.updatePhoto(false, true).subscribe(user => {
        sendAlert(this.eventOpenAlert, 'Profile picture removed successfully')
        this.authService.updateAuthUser(user)
      })
    }else{
      sendAlert(this.eventOpenAlert, 'The default image is already')
    }
  }

  sendPhoto(file){
    const formData = new FormData()
    formData.append('file', file)
    this.userService.updatePhoto(formData).subscribe(user => {
      this.disabled = false
      sendAlert(this.eventOpenAlert, 'Profile picture updated successfully')
      this.authService.updateAuthUser(user)
    })
  }

  uploadPhoto(input, e: any = false){
    if(e){
      if(!this.disabled){
        const image = e.target.files[0]
        if(this.isImage(image)){
          this.disabled = true
          sendAlert(this.eventOpenAlert, 'Uploading...', false)
          const inputFile = document.getElementById('inputFile') as HTMLInputElement
          inputFile.value = ''
          this.sendPhoto(image)
        }else{
          if(e.target.files.length > 0){
            e.value = ''
            sendAlert(this.eventOpenAlert, 'Only images allowed')
          }
        }
      }
    }else{
      if(!this.disabled){
        input.click()
      }else{
        sendAlert(this.eventOpenAlert, 'An image is already being uploaded, please wait...', false)
      }
    }
  }

  isImage(image: File){
    return image?.type.split('/')[0] === 'image'
  }

}
