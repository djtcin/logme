import { Injectable, EventEmitter } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { ActivityType } from './activity-type';
import { Activity } from './activity';
import { Log } from './log';
import { DataStorageService } from './data-storage.service';

const ACTIVITY = 'ACTIVITY';
const ACTIVITY_TYPE = 'ACTIVITY_TYPE';
const LOG = 'LOG';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	private activityTypes: ActivityType[];
	private activityTypes$ = new EventEmitter<ActivityType[]>();
	private activities: Activity[];
	private activities$ = new EventEmitter<Activity[]>();
	private logs: Log[];
	private logs$ = new EventEmitter<Log[]>();

  constructor(private dataStorageService: DataStorageService) { 
  	this.loadFromStorage();
  }

  loadFromStorage() {
  	this.activities = <Activity[]> this.dataStorageService.getList(ACTIVITY);
  	this.activityTypes = <ActivityType[]> this.dataStorageService.getList(ACTIVITY_TYPE);
  	this.logs = <Log[]> this.dataStorageService.getList(LOG);
  }

  saveOnPhysicalStorage() {
  	// TODO implement save LocalStorage data into a Json file
  }

  restoreFromPhysicalStorage() {
  	// TODO implement replace LocalStorage info by a Json file's content
  }

  addActivity(activity : Activity) {
    activity.id = UUID.UUID();
  	this.activities.push(activity);
  	this.activities$.emit(this.activities.slice());
  	this.dataStorageService.setEntity(activity);
    this.dataStorageService.setList(ACTIVITY, this.activities);
  }

  saveActivityType(type: ActivityType) {
    this.dataStorageService.setEntity(type);
  }

  saveActivity(activity: Activity) {
    this.dataStorageService.setEntity(activity);
  }

  removeActivityType(type: ActivityType) {
    // TODO: allow to display all activities from deleted types together as a group of activities without parent
    this.dataStorageService.removeEntity(type);
  }

  updateActivityTypeList(list: ActivityType[]) {
    this.activityTypes = list.slice();
    this.dataStorageService.setList(ACTIVITY_TYPE, this.activityTypes);
    this.activityTypes$.emit(this.activityTypes);
  }

  addLog(log: Log) {
    log.id = UUID.UUID();
  	this.logs.push(log);
  	this.logs$.emit(this.logs.slice());
    this.dataStorageService.setEntity(log);
    this.dataStorageService.setList(LOG, this.logs);
  }

  getActivities() {
  	return this.activities.slice(); 
  }

  getActivityTypes() {
  	return this.activityTypes.slice(); 
  }

  getLogs() {
  	return this.logs.slice(); 
  }

  getActivitiesObservable() : EventEmitter<Activity[]>{
  	return this.activities$;
  }

  getActivityTypesObservable() : EventEmitter<ActivityType[]>{
  	return this.activityTypes$; 
  }

  getLogsObservable() : EventEmitter<Log[]>{
  	return this.logs$; 
  }
}
