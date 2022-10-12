import { Component } from '@angular/core';
import { format, compareAsc } from 'date-fns'
import { DateFnsPipe } from './date-fns.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-date-fns';

  today = new Date();

  _fToday = format(this.today, 'MM/dd/yyyy');

  datefnsPipe = new DateFnsPipe();

  constructor() {
    console.log('' + this.datefnsPipe.transform(this.today, '', 'MM/dd/yyyy'));
  }
}
