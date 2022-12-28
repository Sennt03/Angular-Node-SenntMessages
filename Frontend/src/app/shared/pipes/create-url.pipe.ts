import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'createUrl'
})
export class CreateUrlPipe implements PipeTransform {

  transform(value: string): string {
    let url: any = value.split('/')
    if(environment.production){
      url = '/' + url[url.length - 1]
    }else{
      url = environment.url_base + '/' + url[url.length - 1]
    }
    return url
  }

}
