import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenContent',
  standalone: true
})
export class ShortenContentPipe implements PipeTransform {

  transform(value: string, numberOfCharacters?: number): string {
    if (value.length < (numberOfCharacters ?? 250)) {
      return value;
    } else {
      return value.slice(0, numberOfCharacters ?? 250) + " ...";
    }
  }
}
