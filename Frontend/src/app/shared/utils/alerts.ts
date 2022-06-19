import { HttpErrorResponse } from '@angular/common/http'
import { LsEventOpenAlert } from 'src/app/core/models/alerts.models'
import { Subject } from 'rxjs'

export function alertHandleErr(err: HttpErrorResponse, emitOpenAlert: Subject<LsEventOpenAlert>, time = true){
    const content = err.error.mymessage ? err.error.mymessage : 'An unexpected error has occurred'
    emitOpenAlert.next({content, time})
}

export function sendAlert(emitOpenAlert: Subject<LsEventOpenAlert>, content, time = true){
    emitOpenAlert.next({content, time})
}