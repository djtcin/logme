import { BaseEntity } from './base-entity';
import { Activity } from './activity';
import { DateTimeHelper } from './date-time.helper';

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

	getStartDate() {
		return typeof this.startDate == 'string' ? new Date(this.startDate) : this.startDate;
	}

	getEndDate() {
		return !this.endDate ? 
			new Date() : 
			(typeof this.endDate == 'string' ? new Date(this.endDate) : this.endDate);
	}

	diffInHours() : number {
		return DateTimeHelper.getDiffInHours(this.getEndDate(), this.getStartDate());
	}

	diffInHoursSameDate(date: Date) {
		const startDate = this.getStartDate();
		const endDate = this.getEndDate();

		if (DateTimeHelper.isSameDate(date, startDate)) {
			if (DateTimeHelper.isSameDate(date, endDate)) {
				return DateTimeHelper.getDiffInHours(endDate, startDate);
			} else {
				const endOfGivenDate = new Date(date.getTime())
				endOfGivenDate.setHours(23,59,59,59);
				return DateTimeHelper.getDiffInHours(endOfGivenDate, startDate);
			}
		} else if (DateTimeHelper.isSameDate(date, endDate)) {
			const startOfGivenDate = new Date(date.getTime());
			startOfGivenDate.setHours(0,0,0,0);
			return DateTimeHelper.getDiffInHours(endDate, startOfGivenDate);
		}

		return 0;
	}
}
