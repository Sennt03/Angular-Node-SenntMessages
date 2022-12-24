// schedule = {
//     timeOut: setTimeout,
//     id: string
// } 

class Schedules{
    schedules = []

    static _instance

    static get instance(){
        return this._instance || (this._instance = new Schedules())
    }

    getList(){
        return this.schedules
    }

    addSchedule(schedule){
        this.schedules.push(schedule)
    }

    deleteSchedule(id){
        this.schedules = this.schedules.filter(schedule => schedule.id != id)
    }

    clearAndDeleteSchedule(id){
        const schedule = this.schedules.find(schedule => schedule.id == id)
        clearTimeout(schedule?.timeOut)
        this.schedules = this.schedules.filter(schedule => schedule.id != id)
    }

}

const instance = Schedules.instance

module.exports = instance