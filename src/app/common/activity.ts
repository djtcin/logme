import { ActivityType } from './activity-type';
import { Log } from './log';

import { BaseEntity } from './base-entity';

export class Activity extends BaseEntity {
	title: string;
	type: ActivityType;
	logs: Log[];

	constructor(obj: BaseEntity = null) {
		super();
		this.logs = [];
		Object.assign(this, obj);
	}

	isInProgress() {
		return this.logs.find(l => l.isInProgress()) != null;
	}

	totalTime() {
		let total = 0.0;

		this.logs.forEach(l => total += l.diffInHours());

		return total.toFixed(2);
	}
}
