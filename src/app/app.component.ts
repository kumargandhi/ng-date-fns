import { Component } from '@angular/core';
import { format, compareAsc } from 'date-fns'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-date-fns';

  today = new Date();

  _fToday = format(this.today, 'MM/dd/yyyy');
}
