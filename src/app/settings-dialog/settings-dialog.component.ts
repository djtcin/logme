import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';

import { DataService } from '../common/data.service';
import { ActivityType } from '../common/activity-type';
import { Settings } from '../common/settings';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
	types: ActivityType[];
	deletedTypes: ActivityType[];
  settings: Settings;

	constructor(
		public dialogRef: MatDialogRef<SettingsDialogComponent>,
		private dataService: DataService) {}

  ngOnInit() {
  	this.types = this.dataService.getActivityTypes();
  	this.deletedTypes = [];
    this.settings = this.dataService.getSettings();
  }

  onAddType() {
  	const newType = new ActivityType();
  	newType.id = UUID.UUID();
  	this.types.push(newType);
  }

  onCancelClick(): void {
    this.dataService.loadSettings();
    this.dialogRef.close();
  }

  onSaveClick(): void {
  	this.dataService.saveSettings();
  	this.types.forEach(t => this.dataService.saveActivityType(t));
  	this.deletedTypes.forEach(t => this.dataService.removeActivityType(t));
  	this.dataService.updateActivityTypeList(this.types);
    this.dialogRef.close();
  }

  onUpType(type: ActivityType) {
  	const index = this.types.indexOf(type);

  	if (index > 0) {
  		this.types.splice(index, 1);
  		this.types.splice(index - 1, 0, type);
  	}
  }

  onDownType(type: ActivityType) {
		const index = this.types.indexOf(type);

  	if (index < this.types.length - 1) {
  		this.types.splice(index, 1);
  		this.types.splice(index + 1, 0, type);
  	}
  }

  onRemoveType(type: ActivityType) {
  	const index = this.types.indexOf(type);

  	this.deletedTypes.push(type);
  	this.types.splice(index, 1);
  }
}
