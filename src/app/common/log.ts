import { BaseEntity } from './base-entity';
import { Activity } from './activity';

export class Log extends BaseEntity {
	public startDate: Date;
	public endDate?: Date;
	public activityId: string;

	constructor(obj: BaseEntity = null) {
		super();
		Object.assign(this, obj);
	}

	isInProgress() {
		return !this.endDate;
	}

	diffInHours() {
		const endDate = !this.endDate ? 
			new Date() : 
			(typeof this.endDate == 'string' ? new Date(this.endDate) : this.endDate);
		const startDate = typeof this.startDate == 'string' ? new Date(this.startDate) : this.startDate

		return Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
	}
}
