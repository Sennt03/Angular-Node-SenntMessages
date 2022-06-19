import { LsUser } from '@models/user.model'
import { Action } from '@ngrx/store'

export const SAVEUSER = '[User] SAVEUSER'

export class SaveUserAction implements Action{
    readonly type = SAVEUSER
    
    constructor(public payload: LsUser){}
}

export type actions = SaveUserAction