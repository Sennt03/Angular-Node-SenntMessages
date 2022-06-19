import { LsChat } from '@models/chat.model';
import * as chatsActions from './chats.actions'

export function chatsReducer(state: LsChat[] = chatsDefault, action: chatsActions.actions){
    switch (action.type) {
        case chatsActions.SAVECHATS:
            return action.payload
            break;
        
        case chatsActions.ADDCHAT:
            const chats = [action.payload, ...state]
            return chats
            break;
        
        case chatsActions.CHANGELASTMESSAGE:
            const chats2 = [...state]
            const payload = action.payload
            const index2 = chats2.findIndex(chat => chat._id == payload.message.chatId)
            if(index2 > -1){
                const newChat = {
                    ...chats2[index2],
                    lastMessage: payload.message
                }
                chats2[index2] = newChat
            }else{
                chats2.push({
                    _id: payload.message.chatId,
                    users: [payload.myuser, payload.message.userFrom]
                })
            }
            return chats2
            break;

        case chatsActions.READCHANGECHAT:
            const chats3 = [...state]
            const chat = chats3.find(chat => chat._id == action.payload.chatId)
            const chatIndex = chats3.findIndex(chat => chat._id == action.payload.chatId)

            const newChat = {...chat, noRead: 0}
            chats3[chatIndex] = newChat

            return chats3
            break;
    
        default:
            return state
            break;
    }
}

const chatsDefault = []