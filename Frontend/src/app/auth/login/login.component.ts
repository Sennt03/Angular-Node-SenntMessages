import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LsEventOpenAlert } from '@models/alerts.models';
import { AuthService } from '@services/auth.service';
import { alertHandleErr, sendAlert } from '@shared/utils/alerts';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
    document.body.style.overflow = 'auto'
  }

  eventOpenAlert = new Subject<LsEventOpenAlert>();

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  login(){
    if(this.form.valid){
      sendAlert(this.eventOpenAlert, 'Cargando...', false)
      this.authService.login(this.form.value).subscribe(res => {
        this.authService.saveAuth(res)
        this.form.markAsUntouched()
        this.router.navigate(['/'])
      }, err => alertHandleErr(err, this.eventOpenAlert))
    }else{
      this.form.markAllAsTouched()
    }
  }

  required(field: 'email' | 'password'){
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
