import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(data: {latitud: any, longitud: any}): string {
    
    return `https://www.google.com/maps?q=${data.latitud},${data.longitud}&z=17&hl=es`;
  }

}
