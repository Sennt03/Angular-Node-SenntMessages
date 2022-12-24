import { LsUser } from '@models/user.model'
import { Action } from '@ngrx/store'

export const SAVEUSER = '[User] SAVEUSER'
export const LOGOUTUSER = '[User] LOGOUTUSER'

export class SaveUserAction implements Action{
    readonly type = SAVEUSER
    
    constructor(public payload: LsUser){}
}

export class LogoutUserAction implements Action{
    readonly type = LOGOUTUSER
}

export type actions = SaveUserAction | LogoutUserAction