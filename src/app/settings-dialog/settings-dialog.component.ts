import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';

import { DataService } from '../common/data.service';
import { ActivityType } from '../common/activity-type';

const NAME_KEY = 'settings-user-name';
const SPRINT_KEY = 'settings-sprint';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
	userName: string;
	sprint: string;
	types: ActivityType[];
	deletedTypes: ActivityType[];

	constructor(
		public dialogRef: MatDialogRef<SettingsDialogComponent>,
		private dataService: DataService) {}

  ngOnInit() {
  	this.types = this.dataService.getActivityTypes();
  	this.deletedTypes = [];
  	this.userName = localStorage.getItem(NAME_KEY);
  	this.sprint = localStorage.getItem(SPRINT_KEY);
  }

  onAddType() {
  	const newType = new ActivityType();
  	newType.id = UUID.UUID();
  	this.types.push(newType);
  }

  onCancelClick(): void {
  	// TODO: restore types if the name was changed
    this.dialogRef.close();
  }

  onSaveClick(): void {
  	localStorage.setItem(NAME_KEY, this.userName);
  	localStorage.setItem(SPRINT_KEY, this.sprint);
  	
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
