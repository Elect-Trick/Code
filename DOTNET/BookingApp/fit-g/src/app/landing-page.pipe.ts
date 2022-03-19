import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'landingPage'
})
export class LandingPagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
