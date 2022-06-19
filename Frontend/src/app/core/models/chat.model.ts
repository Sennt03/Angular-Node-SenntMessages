import { LsMessage } from "./message.model";
import { LsUser } from "./user.model";

export interface LsGetChatId{
    _id: string,
    users: string[]
}

export interface LsChat{
    _id: string,
    users: LsUser[],
    lastMessage?: LsMessage,
    noRead?: number,
    createdAt?: Date,
    updatedAt?: Date
}