import { LsMessage, LsMessagesFromChat } from '@models/message.model'
import { Action } from '@ngrx/store'

export const SAVEMESSAGES = '[Messages] SAVEMESSAGES'
export const ADDMESSAGE = '[Messages] ADDMESSAGE'
export const READMESSAGES = '[Messages] READMESSAGES'
export const DELETEMESSAGE = '[Messages] DELETEMESSAGE'
export const UPDATEMESSAGE = '[Messages] UPDATEMESSAGE'

export class SaveMessagesAction implements Action{
    readonly type = SAVEMESSAGES

    constructor(public payload: LsMessagesFromChat){}
}

export class AddMessageAction implements Action{
    readonly type = ADDMESSAGE

    constructor(public payload: {chatId: string, message: LsMessage}){}
}

export class ReadMessagesAction implements Action{
    readonly type = READMESSAGES

    constructor(public payload: {chatId: string}){}
}

export class DeleteMessagesAction implements Action{
    readonly type = DELETEMESSAGE

    constructor(public payload: {messageId: string, chatId: string}){}
}

export class UpdateMessageAction implements Action{
    readonly type = UPDATEMESSAGE

    constructor(public payload: {message: string, messageId: string, chatId: string}){}
}

export type actions = SaveMessagesAction |
                      AddMessageAction |
                      ReadMessagesAction |
                      DeleteMessagesAction |
                      UpdateMessageAction