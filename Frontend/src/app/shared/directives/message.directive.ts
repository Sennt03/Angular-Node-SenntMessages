import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMessage]'
})
export class MessageDirective {

  constructor(
    private element: ElementRef
  ) {
    setTimeout(() => {
      const div = element.nativeElement as HTMLElement
      if(div.innerHTML.split('\n').length > 1){
        div.classList.add('no_float')
      }
    }, 0);
  }

}
