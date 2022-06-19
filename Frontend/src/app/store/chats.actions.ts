import { LsChat } from '@models/chat.model'
import { LsMessage } from '@models/message.model'
import { LsUser } from '@models/user.model'
import { Action } from '@ngrx/store'

export const SAVECHATS = '[Chats] SAVECHATS'
export const ADDCHAT = '[Chats] ADDCHAT'
export const CHANGELASTMESSAGE = '[Chats] CHANGELASTMESSAGE'
export const READCHANGECHAT = '[Chats] READCHANGECHAT'

export class SaveChatsAction implements Action{
    readonly type = SAVECHATS
    
    constructor(public payload: LsChat[]){}
}

export class AddChatAction implements Action{
    readonly type = ADDCHAT
    
    constructor(public payload: LsChat){}
}

export class ChangeLastMessageAction implements Action{
    readonly type = CHANGELASTMESSAGE
    
    constructor(public payload: {myuser: LsUser, message: LsMessage}){}
}

export class ReadChangeChatAction implements Action{
    readonly type = READCHANGECHAT
    
    constructor(public payload: {chatId: string}){}
}

export type actions = SaveChatsAction |
                      AddChatAction |
                      ChangeLastMessageAction |
                      ReadChangeChatAction