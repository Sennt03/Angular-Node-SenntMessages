import { LsMessage } from "./message.model";
import { LsUser } from "./user.model";

export interface LsGetChatId{
    _id: string,
    users: string[]
}

export interface LsChat{
    _id: string,
    users: LsUser[],
    blocked?: LsBlock,
    lastMessage?: LsMessage,
    noRead?: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface LsBlock{
    from?: string,
    to?: string
}