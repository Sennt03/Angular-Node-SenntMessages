import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: string): string {
    const imageSizeNum = parseInt(value)
    const size = Math.round(imageSizeNum / 1000)
    if(imageSizeNum > 1000000){
      return `${size} MB`
    }else{
      return `${size} kB`
    }
  }

}
