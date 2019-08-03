import { Component, OnInit, Input } from '@angular/core';

import { ActivityType } from '../common/activity-type';
import { Activity } from '../common/activity';
import { DataService } from '../common/data.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
	@Input() type: ActivityType;
	activities: Activity[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	this.activities = this.dataService.getActivities()
  		.filter(a => a.type.name == this.type.name);
    this.dataService.getActivitiesObservable().subscribe(
      activities => this.activities = activities.filter(a => a.type.name == this.type.name)
    );  
  }

}
