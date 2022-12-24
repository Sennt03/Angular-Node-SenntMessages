import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LsEventOpenAlert } from '@models/alerts.models';
import { LsUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { CallService } from '@services/call.service';
import { SocketService } from '@services/socket.service';
import { sendAlert } from '@shared/utils/alerts';

import { filter, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  subListenCallEnd: Subscription
  answered = false
  finished = false
  peerId: string
  eventOpenAlert = new Subject<LsEventOpenAlert>();
  currentStream
  remoteStream
  user: LsUser
  dataPeer

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private callService: CallService,
    private socketService: SocketService,
    private authService: AuthService
  ) {
    this.user = this.authService.getMyUser()
    this.callService.remoteStream$.pipe(filter(res => !!res)).subscribe(stream => { this.activeRemoteVideo(stream) })
    this.loadPeer()
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subListenCallEnd?.unsubscribe()
    this.callEnd()
  }

  listenCallEnd(){
    this.subListenCallEnd = this.socketService.listen(environment.events.CALL_ENDED).subscribe(res => {
      this.callEnd(true)
    })
  }

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: this.dataPeer.type == 'video' ? true : false
      }).then(stream => {
        this.currentStream = stream;
        // this.addVideoUser(stream);
        this.runPeer()
      }).catch(() => {
        sendAlert(this.eventOpenAlert, "Could not access audio or video. Can't continue")
      });
    } else {
      sendAlert(this.eventOpenAlert, "It does not have an audio or video device. Can't continue")
    }
  }

  loadPeer(){
    this.peerId = this.route.snapshot.paramMap.get('idPeer')
    this.callService.getPeer(this.peerId).subscribe(res => {
      this.dataPeer = res
      this.checkMediaDevices()
    }, err => {
      this.callEnd()
    })
  }

  runPeer(){
    if(this.dataPeer.connected[0] != this.user._id){
      if(this.dataPeer.connected.length < 1){
        this.callService.initPeer(this.peerId)
        console.log('enviando call')
        this.sendCall()
      }else{
        console.log('reciviendo call')
        this.callService.initPeer(uuidv4())
        this.enterCall()
      }
    }else{
      this.callEnd()
    }
  }

  sendCall(){
    this.callService.sendCall(this.peerId).subscribe(res => {
      this.callService.enableCallAnswer(this.currentStream)
      this.listenCallEnd()
    })
  }

  enterCall(){
    console.log(this.dataPeer)
    this.callService.establishMediaCall(this.peerId, this.currentStream)
    this.listenCallEnd()
  }

  activeRemoteVideo(stream){
    this.remoteStream = stream
    this.answered = true
  }

  callEnd(toMe: boolean = false){
    this.callService.closeMediaCall(this.currentStream)
    this.callService.destroyPeer()
    this.currentStream?.getTracks().forEach(track => {
      track.stop();
    })
    this.currentStream = null
    if(toMe){
      this.finished = true
    }else{
      this.callService.deleteCall(this.peerId).subscribe(res => {
        this.router.navigate(['/'])
      })
      this.router.navigate(['/'])
    }
  }

}
