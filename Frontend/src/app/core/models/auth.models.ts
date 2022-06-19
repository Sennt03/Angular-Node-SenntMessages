import { LsUser } from "./user.model"

export type LsFields = 'email' | 'username'

export interface LsisAvaible{
    isAvailable: boolean
}

export interface LsRegister{
    name: string,
    username: string,
    email: string,
    password: string
}

export interface LsLogin{
    email: string,
    password: string
}

export interface LsResAuth{
    user: LsUser,
    token: string
}