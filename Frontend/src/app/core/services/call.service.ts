import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { BehaviorSubject, catchError, Observable, ObservableInput, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { LsPeer } from '@models/call.models';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  private peer: Peer;
  private mediaCall: MediaConnection;

  private localStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public localStream$ = this.localStreamBs.asObservable();
  private remoteStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public remoteStream$ = this.remoteStreamBs.asObservable();

  private url = `${environment.url_api}/call`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // HTTP
  createCall(to: string, type = 'voice'): Observable<LsPeer>{
    return this.http.post<LsPeer>(`${this.url}/createCall`, {to, type})
    .pipe(catchError(err => { return this.handleError(err) }))
  }
  
  getPeer(peerId: string): Observable<LsPeer>{
    return this.http.get<LsPeer >(`${this.url}/getPeer/${peerId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }
  
  sendCall(peerId: string): Observable<LsPeer>{
    return this.http.post<LsPeer>(`${this.url}/sendCall`, {peerId})
    .pipe(catchError(err => { return this.handleError(err) }))
  }
  
  deleteCall(peerId: string){
    return this.http.delete(`${this.url}/deleteCall/${peerId}`)
    .pipe(catchError(err => { return this.handleError(err) }))
  }

  private handleError(err: HttpErrorResponse): ObservableInput<any>{
    if(err.status === 401){
      this.authService.logout()
      return throwError('Unauthorized')
    }
    return throwError('Error unexpected')
  }


  // PEER

  public initPeer(idPeer: string): Boolean {
    if (!this.peer || this.peer.disconnected) {
        try {
          this.peer = new Peer(idPeer, {
            host: environment.peer.host,
            port: environment.peer.port,
            path: environment.peer.path,
            // secure: true
          })
          return true
        } catch (error) {
          return false
        }
    }

    return true
  }

  public enableCallAnswer(stream): boolean {
    try {
        this.peer.on('call', async (call) => {

            this.mediaCall = call;

            this.mediaCall.answer(stream);
            this.mediaCall.on('stream', (remoteStream) => {
              this.remoteStreamBs.next(remoteStream);
            });
        });
        return true
    }
    catch (ex) {
        console.error(ex)
        return false
    }
  }

  public establishMediaCall(remotePeerId: string, stream): boolean {
    try {
        const connection = this.peer.connect(remotePeerId);
        connection.on('error', err => {
            console.error(err);
        });

        this.mediaCall = this.peer.call(remotePeerId, stream);
        if (!this.mediaCall) {
            let errorMessage = 'Unable to connect to remote peer';
            throw new Error(errorMessage);
        }

        // this.localStreamBs.next(stream);
        this.mediaCall.on('stream', (remoteStream) => {
          this.remoteStreamBs.next(remoteStream);
        })
        return true
    }
    catch (ex) {
        console.error(ex)
        return false
    }

  }

  private onCallClose() {
    this.remoteStreamBs?.value?.getTracks().forEach(track => {
        track.stop();
    });
  }

  public closeMediaCall(localStream) {
      this.mediaCall?.close();
      if (!this.mediaCall) {
          this.onCallClose()
      }
  }

  public destroyPeer() {
      this.mediaCall?.close();
      this.peer?.disconnect();
      this.peer?.destroy();
  }
}
