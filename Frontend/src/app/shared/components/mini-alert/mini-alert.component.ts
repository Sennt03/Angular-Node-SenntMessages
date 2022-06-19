import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LsEventOpenAlert } from 'src/app/core/models/alerts.models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-alert',
  templateUrl: './mini-alert.component.html',
  styleUrls: ['./mini-alert.component.scss']
})
export class MiniAlertComponent implements OnInit {

  @ViewChild('minialert') container: ElementRef
  @Input('eventOpenAlert') eventOpenAlert: Observable<LsEventOpenAlert>
  @Input('bottom') bottom = false

  eventSubscription: Subscription
  content: string = ''
  timeOut = null

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.eventSubscription = this.eventOpenAlert.subscribe(content => this.open(content))
  }

  open(content: LsEventOpenAlert){
    this.content = content.content
    const container = this.container.nativeElement
    this.renderer2.setStyle(container, 'display', 'flex')
    
    if(this.bottom){
      this.renderer2.setStyle(container, 'top', 'auto')
      this.renderer2.setStyle(container, 'bottom', '30px')
    }

    if(content.time){
      this.timeOut = setTimeout(() => {
        this.close()
      }, 5000);
    }
  }

  close(){
    if(this.timeOut){
      clearTimeout(this.timeOut)
      this.timeOut = null
    }
    const container = this.container.nativeElement
    this.renderer2.setStyle(container, 'display', 'none')
  }

}
