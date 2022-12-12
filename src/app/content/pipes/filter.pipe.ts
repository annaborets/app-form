import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any, filterText: string) {
    if (filterText === '') {
      return data;
    } else {
      return data.filter((item: any) => {
        return item.name.toLowerCase().includes(filterText.toLowerCase());
      });
    }
  }
}
