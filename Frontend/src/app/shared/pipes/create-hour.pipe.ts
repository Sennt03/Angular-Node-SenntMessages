import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createHour'
})
export class CreateHourPipe implements PipeTransform {

  transform(value: any) {
    let finalHour = value
    if(value){
      const date = new Date(Date.parse(value))
      let minutes: number | string = date.getMinutes()
      if(minutes < 10) minutes = `0${minutes}`
      finalHour = `${date.getHours()}:${minutes}`
    }
    return finalHour;
  }

}
