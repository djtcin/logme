import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from './common/data.service';
import { ActivityType } from './common/activity-type';
import { Activity } from './common/activity';
import { Settings } from './common/settings';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';
import { ImportExportDialogComponent } from './import-export-dialog/import-export-dialog.component';
import { DateTimeHelper } from './common/date-time.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Logme';
  activityTypes: ActivityType[];
  activities: Activity[];
  settings: Settings;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.settings = this.dataService.getSettings();
    
  	this.activityTypes = this.dataService.getActivityTypes();
    this.dataService.getActivityTypesObservable().subscribe(
      (activityTypes: ActivityType[]) => {
        this.activityTypes = activityTypes;
      }
    );

    this.activities = this.dataService.getActivities();
    this.dataService.getActivitiesObservable().subscribe(
      (activities: Activity[]) => {
        this.activities = activities;
      }
    );
  }

  onOpenSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '600px'
    });
  }

  onAddActivity(type: ActivityType) {
    const activity = new Activity();
    activity.type = type;
    this.dataService.addActivity(activity);

    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '600px',
      data: {activity: activity}
    });
  }

  onImportExportClick() {
    this.dialog.open(ImportExportDialogComponent, {
      width: '600px'
    });
  }

  totalHoursToday() {
    let total = 0.0;
    const today = new Date();
    const format = this.settings.timeFormat;
    
    this.activities.forEach(a => total += a.timeByDate(today));

    return DateTimeHelper.formatTime(total, format);
  }

  totalHours() {
    let total = 0.0;
    const format = this.settings.timeFormat;

    this.activities.forEach(a => total += a.totalTime());

    return DateTimeHelper.formatTime(total, format);
  }
}
