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
    doc?: {
        name: string,
        size: string,
        url: string,
        mimetype: string,
        time?: string
    },
    location?: {
        latitud: number,
        longitud: number
    }
    read?: Boolean
    createdAt: Date,
    updatedAt: Date,
    userFrom?: LsUser
}

export interface LsSendMessage{
    chatId: string,
    message: string
    file?: File,
    isLocation?: any
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

export interface LsSchedule{
    _id?: string,
    from: string,
    userTo: LsUser,
    date: Date,
    message: LsMessage
}

export interface LsSendSchedule{
    userTo: string,
    milisegundos: number,
    date: Date,
    message: string,
    file?: File,
    isAudio?: boolean,
    isLocation?: any
}