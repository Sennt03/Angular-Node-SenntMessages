import { LsMessagesFromChat } from '@models/message.model';
import * as messagesActions from './messages.actions'

export function messagesReducer(state: LsMessagesFromChat[] = [], action: messagesActions.actions){
    switch (action.type) {
        case messagesActions.SAVEMESSAGES:
            let messages = [...state]
            const index = messages.findIndex(chat => chat.chatId == action.payload.chatId)
            if(index > -1){
                messages[index] = action.payload
            }else{
                messages = [action.payload, ...state]
            }
            return messages
            break;

        case messagesActions.ADDMESSAGE:
            const msgs = [...state]
            const chatId = action.payload.chatId
            state.forEach(message => {
                if(message.chatId == chatId){
                    const index2 = msgs.findIndex(chat => chat.chatId == chatId)
                    msgs[index2] = {chatId, messages: [...message.messages, action.payload.message]}
                }
            })
            
            return msgs
            break;

        case messagesActions.READMESSAGES:
            const chat = state.find(chat => chat.chatId == action.payload.chatId)
            const chatIndex = state.findIndex(chat => chat.chatId == action.payload.chatId)

            const newMessages = []
            chat.messages.forEach((message, index) => {
                const newMessage = {...message, read: true}
                newMessages.push(newMessage)
            });
            const newChat = {
                chatId: chat.chatId,
                messages: [...newMessages]
            }

            const newState = [...state]
            newState[chatIndex] = newChat

            console.log(newState)
            return newState
            break;
    
        default:
            return state
            break;
    }
}