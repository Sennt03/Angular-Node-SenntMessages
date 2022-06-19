import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createDate'
})
export class CreateDatePipe implements PipeTransform {

  transform(value: any) {
    let finalDate = value
    if(value){
      const actual = new Date()
      const date = new Date(Date.parse(value))
      const dateCompare = `${date.getDate()}/${getMonth(date.getMonth())}/${date.getFullYear()}`
      let today: any = new Date()
      today = `${today.getDate()}/${getMonth(today.getMonth())}/${today.getFullYear()}`
      
      let yesterday: any = new Date(actual.getTime() - (24 * 60 * 60 * 1000))
      yesterday = `${yesterday.getDate()}/${getMonth(yesterday.getMonth())}/${yesterday.getFullYear()}`
      
      let lastWeek = new Date(actual.getTime() - (24 * 60 * 60 * 1000) * 7)
      
      if(dateCompare === today){
        // Si es fecha de hoy devuelve la hora
        let minutes: number | string = date.getMinutes()
        if(minutes < 10) minutes = `0${minutes}`
        finalDate = `${date.getHours()}:${minutes}`
      }else if(dateCompare === yesterday){
        // Si es fecha de ayer devuelve Yesterday
        finalDate = 'Yesterday'
      }else if((date.getTime() > lastWeek.getTime() && date.getTime() < actual.getTime()) && date.getDay() !== actual.getDay()){
        // Si es una fecha dentro de esta semana, devuelve el dia
        finalDate = getDay(date.getDay())
      }else{
        // Si es una fecha mas antigua devuelve la fecha en formato dd/mm/yy
        finalDate = dateCompare
      }
    }
    return finalDate;
  }

}

function getDay(day){
  switch (day) {
    case 1:
     return'Monday'
      break;
    case 2:
      return 'Tuesday'
      break;
    case 3:
      return 'Wednesday'
      break;
    case 4:
      return 'Thursday'
      break;
    case 5:
      return 'Friday'
      break;
    case 6:
      return 'Saturday'
      break;
    case 0:
      return 'Sunday'
      break;
    default:
      return 'Monday'
      break;
  }
}

function getMonth(month: number){
  switch (month) {
    case 0:
      return '01'
      break;
    case 1:
      return '02'
      break;
    case 2:
      return '03'
      break;
    case 3:
      return '04'
      break;
    case 4:
      return '05'
      break;
    case 5:
      return '06'
      break;
    case 6:
      return '07'
      break;
    case 7:
      return '08'
      break;
    case 8:
      return '09'
      break;
    case 9:
      return '10'
      break;
    case 10:
      return '11'
      break;
    case 11:
      return '12'
      break;
    default:
      return '01'
      break;
  }
}