import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromFireStore'
})
export class DateFromFireStorePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return new Date(value.seconds * 1000);
  }

}
