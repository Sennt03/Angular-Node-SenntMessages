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
        
        case chatsActions.UPDATECHAT:
            const chatsUpdate = [...state]
            const chatIdUpdate = action.payload.chatId
            const messagesUpdated = action.payload.messages
            state.forEach((chat, index) => {
                if(chat._id == chatIdUpdate){
                    const lastMessage = messagesUpdated[messagesUpdated.length - 1]
                    const noReadMessages = messagesUpdated.filter(message => !message?.read && message.to == action.payload.myUserId)
                    console.log(noReadMessages)
                    const noRead = noReadMessages.length
                    chatsUpdate[index] = { ...chatsUpdate[index], lastMessage, noRead }
                    return
                }
            })
            return chatsUpdate
            break;

        case chatsActions.UPDATEBLOCKCHAT:
            const chatsUpdateBlock = [...state]
            const chatIdUpdateBlock = action.payload.chatId
            let blocked = {}
            if(action.payload.block){
                blocked = action.payload.block
            }
            state.forEach((chat, index) => {
                if(chat._id == chatIdUpdateBlock){
                    chatsUpdateBlock[index] = { ...chatsUpdateBlock[index], blocked }
                    return
                }
            })
            return chatsUpdateBlock
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
            let newChat = {...chat}
            if(action.payload?.userId){
                if(chat?.lastMessage?.to == action.payload?.userId){
                    newChat = {...chat, noRead: 0, lastMessage: { ...chat?.lastMessage, read: true }}
                }
            }else{
                newChat = {...chat, noRead: 0, lastMessage: { ...chat?.lastMessage, read: true }}
            }
            chats3[chatIndex] = newChat

            return chats3
            break;
    
        default:
            return state
            break;
    }
}

const chatsDefault = []