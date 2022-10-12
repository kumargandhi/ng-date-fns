import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
    name: 'datefns'
})
export class DateFnsPipe implements PipeTransform {
    transform(value: any, timezone: string, formatter: string, defaultText: string = "Invalid date!") {
        if (!value) {
            return defaultText;
        }
        return format(value, formatter);
    }
}