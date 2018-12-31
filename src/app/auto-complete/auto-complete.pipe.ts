import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'autoComplete'
})
export class AutoCompletePipe implements PipeTransform {

  transform(data: string[], searchTerm?: any): any {

    if (!searchTerm) {
      return [];
    }

    return data.filter((el) => {
      if (el) {
        if (el.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }

      return false;
    });
  }

}
