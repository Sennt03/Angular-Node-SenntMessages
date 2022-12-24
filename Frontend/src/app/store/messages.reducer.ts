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
                    const existsMessage = message.messages.find(message => message._id == action.payload.message._id)
                    if(!existsMessage){
                        msgs[index2] = {chatId, messages: [...message.messages, action.payload.message]}
                    }
                }
            })
            
            return msgs
            break;

        case messagesActions.DELETEMESSAGE:
            const msgsDelete = [...state]
            const messageIdDelete = action.payload.messageId
            const chatIdDelete = action.payload.chatId
            state.forEach(chat => {
                if(chat.chatId == chatIdDelete){
                    const index = msgsDelete.findIndex(chat => chat.chatId == chatIdDelete)
                    const newMessages = [...chat.messages].filter(message => message._id != messageIdDelete)
                    msgsDelete[index] = {chatId: chatIdDelete, messages: [...newMessages]}
                }
            })
            
            return msgsDelete
            break;

        case messagesActions.READMESSAGES:
            const chat = state.find(chat => chat.chatId == action.payload.chatId)
            const chatIndex = state.findIndex(chat => chat.chatId == action.payload.chatId)

            const newMessages = []
            chat?.messages.forEach(message => {
                const newMessage = {...message, read: true}
                newMessages.push(newMessage)
            });
            const newChat = {
                chatId: chat?.chatId,
                messages: [...newMessages]
            }

            const newState = [...state]
            newState[chatIndex] = newChat

            return newState
            break;

        case messagesActions.UPDATEMESSAGE:
            const chatUpdateMessage = state.find(chat => chat.chatId == action.payload.chatId)
            const chatIndexUpdateMessage = state.findIndex(chat => chat.chatId == action.payload.chatId)

            const newMessagesUpdateMessage = []
            chatUpdateMessage?.messages.forEach(message => {
                if(message._id == action.payload.messageId){
                    const newMessage = {...message, message: action.payload.message}
                    newMessagesUpdateMessage.push(newMessage)
                }else{
                    newMessagesUpdateMessage.push(message)
                }
            });
            const newChatUpdateMessage = {
                chatId: chatUpdateMessage?.chatId,
                messages: [...newMessagesUpdateMessage]
            }

            const newStateUpdateMessage = [...state]
            newStateUpdateMessage[chatIndexUpdateMessage] = newChatUpdateMessage

            return newStateUpdateMessage
            break;
            
    
        default:
            return state
            break;
    }
}