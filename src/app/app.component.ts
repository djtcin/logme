import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from './common/data.service';
import { ActivityType } from './common/activity-type';
import { Activity } from './common/activity';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Logme';
  activityTypes: ActivityType[];

  // TODO: review access type (public vs private)
  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
  	this.activityTypes = this.dataService.getActivityTypes();
    this.dataService.getActivityTypesObservable().subscribe(
      (activityTypes: ActivityType[]) => {
        this.activityTypes = activityTypes;
      }
    );
  }

  onOpenSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '6000px'
    });
  }

  onAddActivity(type: ActivityType) {
    const activity = new Activity();
    activity.type = type;
    this.dataService.addActivity(activity);

    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '6000px',
      data: {activity: activity}
    });
  }
}
