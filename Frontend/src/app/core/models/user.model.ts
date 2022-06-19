export interface LsUser{
    _id: string,
    name: string,
    username: string,
    email: string,
    chatId?: string,
    image: {
        url: string,
        default?: string
    }
}

export type LsField = 'name' | 'username' | 'email'