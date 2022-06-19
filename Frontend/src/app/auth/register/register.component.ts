import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@services/auth.service';
import { MyValidators } from '@shared/utils/myValidators';
import { Subject } from 'rxjs';
import { alertHandleErr, sendAlert } from '@shared/utils/alerts';
import { Router } from '@angular/router';
import { LsEventOpenAlert } from 'src/app/core/models/alerts.models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
    document.body.style.overflowY = 'auto'
  }

  eventOpenAlert = new Subject<LsEventOpenAlert>();

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)], MyValidators.validateUsername(this.authService)],
      email: ['', [Validators.required, Validators.email], MyValidators.validateEmail(this.authService)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, {
      validators: MyValidators.matchPasswords
    })
  }

  register(){
    if(this.form.valid){
      sendAlert(this.eventOpenAlert, 'Cargando...', false)
      this.authService.register(this.form.value).subscribe(res => {
        this.authService.saveAuth(res)
        this.form.markAsUntouched()
        this.router.navigate(['/'])
      }, err => alertHandleErr(err, this.eventOpenAlert))
    }else{
      this.form.markAllAsTouched()
    }
  }

  required(field: 'name' | 'username' | 'email' | 'password'){
    return this.form.get(field).touched && this.form.get(field).invalid && this.form.get(field).hasError('required')
  }

  hasError(field, error){
    return this.form.get(field).hasError(error)
  }

  haveErrors(field){
    return this.form.get(field).touched && this.form.get(field).invalid
  }

  ngOnDestroy(): void {
    document.body.style.overflowY = 'hidden'
  }

}
