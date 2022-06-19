class Users{
    users = []

    static _instance

    static get instance(){
        return this._instance || (this._instance = new Users())
    }

    getList(){
        return this.users
    }

    addUser(user){
        this.users.push(user)
    }

    deleteUser(id){
        this.users = this.users.filter(user => user.socketId != id)
    }

    findById(id){
        return this.users.filter(user => user.userId == id)
    }

}

const instance = Users.instance

module.exports = instance