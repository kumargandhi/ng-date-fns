import { Pipe, PipeTransform } from '@angular/core';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

@Pipe({
    name: 'datefns'
})
export class DateFnsPipe implements PipeTransform {
    transform(value: any, timeZone: string, pattern: string, defaultText: string = "Invalid date!") {
        if (!value) {
            return defaultText;
        }
        if (timeZone) {
            const zonedDate = utcToZonedTime(value, timeZone);
            return format(zonedDate, pattern, { timeZone });
        }
        return format(value, pattern);
    }
}