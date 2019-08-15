import { Component, OnInit, Input } from '@angular/core';

import { Settings } from '../common/settings';
import { Activity } from '../common/activity';
import { DataService } from '../common/data.service';
import { DateTimeHelper } from '../common/date-time.helper';

@Component({
  selector: 'app-summary-bar',
  templateUrl: './summary-bar.component.html',
  styleUrls: ['./summary-bar.component.scss']
})
export class SummaryBarComponent implements OnInit {
	@Input() activities: Activity[];
	settings: Settings;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	this.settings = this.dataService.getSettings();
  }

  totalHoursToday() {
    let total = 0.0;
    const today = new Date();
    const format = this.settings.timeFormat;
    
    this.activities.forEach(a => total += a.timeByDate(today));

    return DateTimeHelper.formatTime(total, format);
  }

  totalHoursWeek() {
    const today = new Date();
		const format = this.settings.timeFormat;
    let total = 0.0;    
    let date = DateTimeHelper.getMonday(today);

    while (date < today || DateTimeHelper.isSameDate(date, today)) {
    	this.activities.forEach(a => total += a.timeByDate(date));
    	date = DateTimeHelper.getNextDate(date);
    }

    return DateTimeHelper.formatTime(total, format);
  }

  totalHours() {
    let total = 0.0;
    const format = this.settings.timeFormat;

    this.activities.forEach(a => total += a.totalTime());

    return DateTimeHelper.formatTime(total, format);
  }

}
