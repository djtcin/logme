import { Injectable, EventEmitter } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as FileSaver from 'file-saver';

import { ActivityType } from './activity-type';
import { Activity } from './activity';
import { Log } from './log';
import { DataStorageService } from './data-storage.service';

const ACTIVITY = 'ACTIVITY';
const ACTIVITY_TYPE = 'ACTIVITY_TYPE';
const LOG = 'LOG';
const NAME_KEY = 'settings-user-name';
const SPRINT_KEY = 'settings-sprint';

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
    this.logs = <Log[]> this.dataStorageService.getList(LOG).map(l => new Log(l));
  	this.activityTypes = this.dataStorageService.getList(ACTIVITY_TYPE).map(t => new ActivityType(t));
  	this.activities = this.dataStorageService.getList(ACTIVITY).map(a => {
      const activity = new Activity(a);
      activity.logs = this.logs.filter(l => l.activityId == activity.id);
      activity.type = this.activityTypes.find(t => t.id == activity.type.id);
      return activity
    });

  }

  exportData() {
    const data = localStorage;
    const json = JSON.stringify(data);
    const blob = new Blob([json], {type: "application/json"});
    const userName = localStorage.getItem(NAME_KEY);
    const sprint = localStorage.getItem(SPRINT_KEY);

    FileSaver.saveAs(
      blob, 
      'Logme data'
        + (userName ? ' - ' + userName : '' )
        + (sprint ? ' - Sprint ' + sprint : '')
        + '.json'
    );
  }

  importData(file) {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = JSON.parse(fileReader.result.toString());
      localStorage.clear();
      Object.keys(data).forEach(key => localStorage.setItem(key, data[key]));
      this.loadFromStorage();
      this.activityTypes$.emit(this.activityTypes.slice());
      this.activities$.emit(this.activities.slice());
      this.logs$.emit(this.logs.slice());
    }
    fileReader.readAsText(file);
  }

  addActivity(activity : Activity) {
    activity.id = UUID.UUID();
  	this.activities.push(activity);
  	this.activities$.emit(this.activities.slice());
  	this.dataStorageService.setEntity(activity);
    this.dataStorageService.setList(ACTIVITY, this.activities);
  }

  removeActivity(activity: Activity) {
    const index = this.activities.indexOf(activity);
    this.activities.splice(index, 1);
    this.activities$.emit(this.activities.slice());
    this.dataStorageService.removeEntity(activity);
    this.dataStorageService.setList(ACTIVITY, this.activities);
  }

  saveActivityType(type: ActivityType) {
    this.dataStorageService.setEntity(type);
  }

  saveActivity(activity: Activity) {
    this.dataStorageService.setEntity(activity);
  }

  saveLog(log: Log) {
    this.dataStorageService.setEntity(log);
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
