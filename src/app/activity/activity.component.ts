import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Activity } from '../common/activity';
import { Log } from '../common/log';
import { DataService } from '../common/data.service';
import { ActivityDialogComponent } from '../activity-dialog/activity-dialog.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
	@Input() activity: Activity;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
  }

  onStart() {
    const log = new Log();
    log.startDate = new Date();
    log.activityId = this.activity.id;
    this.activity.logs.push(log);
    this.dataService.addLog(log);
    this.dataService.saveActivity(this.activity);
    this.dataService.getLogs().forEach(l => {
      if (l.isInProgress() && l.id != log.id) {
        l.endDate = new Date();
        this.dataService.saveLog(l);
      }
    });

  }

  onStop() {
    const unfinishedLog = this.activity.logs.find(l => l.isInProgress());

  	unfinishedLog.endDate = new Date();
    this.dataService.saveLog(unfinishedLog);
  }

	onEditActivity() {
		const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '6000px',
      data: {activity: this.activity}
    });
	}
}
