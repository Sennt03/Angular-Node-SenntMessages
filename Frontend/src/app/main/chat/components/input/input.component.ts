import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Output('sendMessage') sendMessage: EventEmitter<{message: string, image?: File}> = new EventEmitter()
  @Output('sendAlert') sendAlert: EventEmitter<string> = new EventEmitter()
  input = new FormControl('')
  showImageDiv: boolean = false
  haveImage: boolean = false
  imageFile: File
  image
  emojisToggle = false

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.initInput()
    this.observeOpen()
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
    const text = document.getElementById('input') as HTMLTextAreaElement;
    
    /* 0-timeout to get the already changed text */
    observe(text, 'change',  (e) => {this.resize(e)});
    observe(text, 'cut',     (e) => {this.delayedResize(e)});
    observe(text, 'paste',   (e) => {this.delayedResize(e)});
    observe(text, 'drop',    (e) => {this.delayedResize(e)});
    observe(text, 'keydown', (e) => {this.delayedResize(e)});

    text.focus();
    text.select();  
    this.resize();
  }

  resize (e: any = false) {
    const text = document.getElementById('input') as HTMLTextAreaElement;
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
    const text = document.getElementById('input') as HTMLTextAreaElement;
    text.focus();
    text.select(); 
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
      this.sendMessage.next({message: this.input.value, image: this.imageFile})
      this.cancelImage()
    }else{
      this.sendMessage.next({message: this.input.value})
    }
    this.input.setValue('')
  }

  selectImage(e, inputFile: HTMLInputElement){
    const image = e.target.files[0]
    if(this.isImage(image)){
      this.imageFile = image
      this.openImage(image)
      inputFile.value = ''
    }else{
      this.haveImage = false
      if(e.target.files.length > 0){
        e.value = ''
        this.sendAlert.next('Only images allowed')
      }
    }
  }

  isImage(image: File){
    return image?.type.split('/')[0] === 'image'
  }

  openImage(image: File){
    this.haveImage = true
    const render = new FileReader();
    render.readAsDataURL(image);
    render.onload = (event: ProgressEvent<FileReader>) => {
      this.image = event.target.result;
    };
    this.showImageDiv = true

  }

  cancelImage(){
    this.haveImage = false
    this.imageFile = null
    this.image = null
    this.showImageDiv = false
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

}
