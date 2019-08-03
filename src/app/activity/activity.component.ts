import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Activity } from '../common/activity';
import { ActivityDialogComponent } from '../activity-dialog/activity-dialog.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
	@Input() activity: Activity;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

	onEditActivity() {
		const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '6000px',
      data: {activity: this.activity}
    });
	}
}
