import { LsUser } from '@models/user.model';
import * as userActions from './user.actions'

export function userReducer(state: LsUser = userDefault, action: userActions.actions){
    switch (action.type) {
        case userActions.SAVEUSER:
            return action.payload
            break;
        
        case userActions.LOGOUTUSER:
            return userDefault
            break;
    
        default:
            return state
            break;
    }
}

export const userDefault = {
    _id: '',
    name: '',
    username: '',
    email: '',
    image: {
        url: ''
    }
}