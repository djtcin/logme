import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Activity } from '../common/activity';
import { DataService } from '../common/data.service';

export interface DialogData {
  activity: Activity
}

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit {

  constructor(
  	public dialogRef: MatDialogRef<ActivityDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: DialogData,
  	private dataService: DataService) { }

  ngOnInit() {

  }

  onAddLog() {

  }

  onDeleteClick() {
    this.dataService.removeActivity(this.data.activity);
    this.dialogRef.close();
  }

  onSaveClick() {
    this.data.activity.logs.forEach(l => this.dataService.saveLog(l));
  	this.dataService.saveActivity(this.data.activity);
    this.dialogRef.close();
  }

  onCancelClick() {
  	// TODO: undo name and log changes
  	this.dialogRef.close();
  }

  // TODO: implement close with enter.

}
