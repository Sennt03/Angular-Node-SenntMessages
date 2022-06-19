import { LsChat } from '@models/chat.model'
import { LsMessagesFromChat } from '@models/message.model'
import { LsUser } from '@models/user.model'
import { chatsReducer } from './store/chats.reducer'
import { messagesReducer } from './store/messages.reducer'
import { userReducer } from './store/user.reducer'

export interface AppState{
    user: LsUser,
    chats: LsChat[],
    messages: LsMessagesFromChat[]
}

export const AppStateConfig = {
    user: userReducer,
    chats: chatsReducer,
    messages: messagesReducer
}