import { ActivityType } from './activity-type';
import { Log } from './log';

import { BaseEntity } from './base-entity';

export class Activity extends BaseEntity {
	title: string;
	type: ActivityType;
	logs: Log[];
}
