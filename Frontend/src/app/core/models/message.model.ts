import { LsUser } from "./user.model"

export interface LsMessage{
    _id: string,
    chatId: string,
    from: string,
    to: string,
    message: string,
    image?: {
        url: string,
        public_id: string
    },
    read?: Boolean
    createdAt: Date,
    updatedAt: Date,
    userFrom?: LsUser
}

export interface LsSendMessage{
    chatId: string,
    message: string
    file?: File
}

export interface LsDataNewMessage{
    chatId: string,
    from: {
        _id: string,
        name: string,
        username: string
    },
    to: string,
    message: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date
}

export interface LsMessagesFromChat{
    chatId: string,
    messages: LsMessage[]
}