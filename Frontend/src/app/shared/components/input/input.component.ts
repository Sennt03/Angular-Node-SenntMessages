import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LsEventOpenAlert } from '@models/alerts.models';
import { UserService } from '@services/user.service';
import { closeAlert, sendAlert } from '@shared/utils/alerts';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Output('sendMessage') sendMessage: EventEmitter<{message: string, image?: File, isImage?: boolean, isAudio?: boolean, isLocation?: boolean}> = new EventEmitter()
  @Output('sendAlert') sendAlert: EventEmitter<string> = new EventEmitter()
  @Input('inputId') inputId: any
  input = new FormControl('')
  showImageDiv: boolean = false
  showAudioDiv: boolean = false
  haveImage: boolean = false
  imageFile: File
  image
  emojisToggle = false
  isImageOrDoc: 'image' | 'doc'
  docInfo: any = {}
  eventOpenAlert = new Subject<LsEventOpenAlert>();

  constructor(
    private deviceService: DeviceDetectorService, 
    private userService: UserService
  ) { 
    this.initInput()
  }

  ngOnInit(): void {
    // this.observeOpen()
  }
  
  initInput(){
    let observe;
    const window2: any = window
    if (window2.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on'+event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }
    const text = document.getElementById(this.inputId) as HTMLTextAreaElement;
    if(text){
      /* 0-timeout to get the already changed text */
      observe(text, 'change',  (e) => {this.resize(e)});
      observe(text, 'cut',     (e) => {this.delayedResize(e)});
      observe(text, 'paste',   (e) => {this.delayedResize(e)});
      observe(text, 'drop',    (e) => {this.delayedResize(e)});
      observe(text, 'keydown', (e) => {this.delayedResize(e)});
  
      // text.focus();
      // text.select();  
      // this.resize();
    }else{
      setTimeout(() => {
        this.initInput()
      }, 1000);
    }
  }

  resize (e: any = false) {
    const text = document.getElementById(this.inputId) as HTMLTextAreaElement;
    if(e?.keyCode == 13 && this.deviceService.isDesktop()){
      if(e?.shiftKey){
        text.style.height = 'auto';
        text.style.height = text.scrollHeight+'px';
      }else{
        text.style.height = 'auto';
        text.value = ''
        this.send()
      }
    }else{
      text.style.height = 'auto';
      text.style.height = text.scrollHeight+'px';
      text.scrollTop = text.scrollHeight
    }
  }
  
  delayedResize (e) {
    window.setTimeout(() => {this.resize(e)}, 0);
  }

  open(){
    const text = document.getElementById(this.inputId) as HTMLTextAreaElement;
    text.focus();
    text.select(); 
  }

  openInput(inputFile: HTMLInputElement, image = false){
    if(image) inputFile.accept = 'image/*'
      else inputFile.accept = '*'
    inputFile.click()
  }

  observeOpen(){
    const main = document.getElementById('main')
    if(main){
      const container = document.getElementById('input-container')
      const observe = new IntersectionObserver((entries) => {
        const open = document.getElementById('open')
        if(!entries[0].isIntersecting){
          open.style.display = 'flex'
          main.style.paddingBottom = '16px'
          main.scrollTop = main.scrollHeight
        }else{
          open.style.display = 'none';
          main.style.paddingBottom = '0px'
          observe.unobserve(container)
        }
      })
      observe.observe(container)
    }else{
      setTimeout(() => {
        this.observeOpen()
      }, 250);
    }
  }

  send(){
    if(this.haveImage){
      const isImage = this.isImage(this.imageFile)
      let value = this.input.value
      if(!isImage) value = ''
      this.sendMessage.next({message: value, image: this.imageFile, isImage})
      this.cancelImage()
    }else{
      this.sendMessage.next({message: this.input.value})
    }
    this.input.setValue('')
  }

  selectImage(e, inputFile: HTMLInputElement){
    const image = e.target.files[0]
    this.imageFile = image
    this.openImage(image)
    inputFile.value = ''
  }

  isImage(image){
    return image?.type.split('/')[0] === 'image'
  }

  openImage(image){
    this.haveImage = true
    if(this.isImage(image)){
      this.isImageOrDoc = 'image'
      const render = new FileReader();
      render.readAsDataURL(image);
      render.onload = (event: ProgressEvent<FileReader>) => {
        this.image = event.target.result;
      };
    }else{
      this.isImageOrDoc = 'doc'
      this.docInfo.name = image.name
      const ext = image.name.split('.')
      this.docInfo.ext = ext[ext.length - 1].toUpperCase()
      const size = Math.round(image.size / 1000)
      if(image.size > 1000000){
        this.docInfo.size = `${size} MB`
      }else{
        this.docInfo.size = `${size} kB`
      }
    }
    this.showImageDiv = true
  }

  cancelImage(){
    this.haveImage = false
    this.imageFile = null
    this.image = null
    this.showImageDiv = false
    this.isImageOrDoc = null
    this.docInfo = {}
  }

  // EMOJIS
  addEmoji(e){
    const value = this.input.value
    const newValue = value + e.emoji.native
    this.input.patchValue(newValue)
  }

  openEmojis(){
    this.emojisToggle = !this.emojisToggle
  }

  // AUDIO
  tiempoInicio 
  mediaRecorder 
  idIntervalo
  cancelAudioComp = false
  tiempoGrabando

  animations(){
    const div = document.getElementById('input-container')
    div.classList.add('animate__fadeInLeft')
    div.classList.remove('hiden_input_delay')
    setTimeout(() => {
      div.classList.remove('animate__fadeInLeft')
    }, 500);
  }

  restartAll(){
    this.showAudioDiv = false
    this.showImageDiv = false
    this.cancelAudioComp = true
    this.mediaRecorder = null;
    this.idIntervalo = null
    this.tiempoInicio = null
    this.detenerConteo()
    this.animations()
  }

  cancelAudio(){
    this.showAudioDiv = false
    this.showImageDiv = false
    this.cancelAudioComp = true
    this.detenerGrabacion()
    this.animations()
  }

  // downloadAudio(blobAudio){
  //   const urlParaDescargar = URL.createObjectURL(blobAudio);
  //   let a:any = document.createElement("a");
  //   document.body.appendChild(a);
  //   a.style = "display: none";
  //   a.href = urlParaDescargar;
  //   a.download = blobAudio.name;
  //   a.click();
  //   window.URL.revokeObjectURL(urlParaDescargar)
  // }

  sendAudio(blobAudio){
    this.restartAll()
    const isImage = true
    const value = ''
    if(this.tiempoGrabando != '0:00'){
      this.sendMessage.next({message: value, image: blobAudio, isImage, isAudio: this.tiempoGrabando})
    }
    this.cancelImage()
  }

  // REC AUDIO
  segundosATiempo(numeroDeSegundos){
    let horas: any = Math.floor(numeroDeSegundos / 60 / 60);
    numeroDeSegundos -= horas * 60 * 60;
    let minutos: any = Math.floor(numeroDeSegundos / 60);
    numeroDeSegundos -= minutos * 60;
    numeroDeSegundos = parseInt(numeroDeSegundos);
    // if (horas < 10) horas = '0' + horas;
    // if (minutos < 10) minutos = '0' + minutos;
    if (numeroDeSegundos < 10) numeroDeSegundos = '0' + numeroDeSegundos;

    return `${minutos}:${numeroDeSegundos}`;
  }

  refrescar(){
    const $duracion: any = document.querySelector('#duracion')
    this.tiempoGrabando = this.segundosATiempo((Date.now() - this.tiempoInicio) / 1000)
    $duracion.textContent = this.tiempoGrabando
  }

  comenzarAContar(){
    this.tiempoInicio = Date.now();
    this.idIntervalo = setInterval(() => {this.refrescar()}, 500);
  }

  detenerConteo(){
    clearInterval(this.idIntervalo);
    this.tiempoInicio = null;
  }

  detenerGrabacion(){
      if (!this.mediaRecorder) return sendAlert(this.eventOpenAlert, "it's not recording")
      this.mediaRecorder.stop();
      this.detenerConteo()
      this.mediaRecorder = null;
      this.idIntervalo = null
      this.tiempoInicio = null
      setTimeout(() => {
        this.cancelAudioComp = false
      }, 0);
  };

  recordAudio(){
    setTimeout(() => {
      document.getElementById('input-container').classList.add('hiden_input_delay')
    }, 800);
    this.showAudioDiv = true
    this.showImageDiv = false

    if (this.mediaRecorder) return sendAlert(this.eventOpenAlert, 'Is already recording')
    navigator.mediaDevices.getUserMedia({audio: true})
        .then(
            stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.start();
                this.comenzarAContar();
                const fragmentosDeAudio = [];
                this.mediaRecorder.addEventListener("dataavailable", evento => {
                    fragmentosDeAudio.push(evento.data);
                });

                this.mediaRecorder.addEventListener("stop", () => {
                    stream.getTracks().forEach(track => track.stop());
                    this.detenerConteo();
                    if(!this.cancelAudioComp){
                      const blobAudio: any = new Blob(fragmentosDeAudio);
                      blobAudio.lastModifiedDate = new Date();
                      blobAudio.name = `audio${Date.now()}.ogg`;
                      this.sendAudio(blobAudio)
                    }
                });
            }
        )
        .catch(error => {
            // Aquí maneja el error, tal vez no dieron permiso
            sendAlert(this.eventOpenAlert, 'Unable to record audio. Give microphone permission and try again')
        });

  }


  // LOCATION
  sendLocation(){
    const confirmComp = confirm('Send current location?')
    if(confirmComp){
      sendAlert(this.eventOpenAlert, 'Getting location', false)
      this.userService.getPosition().then(res => {
        closeAlert(this.eventOpenAlert)
        const isLocation: any = {longitud: res.coords.longitude, latitud: res.coords.latitude}
        this.sendMessage.next({message: '', isImage: false, isAudio: false, isLocation})
      }).catch(err => sendAlert(this.eventOpenAlert, 'Failed to send location'))
    }
  }

}
