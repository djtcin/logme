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

	getStartDate() {
		return typeof this.startDate == 'string' ? new Date(this.startDate) : this.startDate;
	}

	getEndDate() {
		return !this.endDate ? 
			new Date() : 
			(typeof this.endDate == 'string' ? new Date(this.endDate) : this.endDate);
	}

	diffInHours() {
		return this.getDiffInHours(this.getEndDate(), this.getStartDate());
	}

	diffInHoursSameDate(date: Date) {
		const startDate = this.getStartDate();
		const endDate = this.getEndDate();

		if (this.isSameDate(date, startDate)) {
			if (this.isSameDate(date, endDate)) {
				return this.getDiffInHours(endDate, startDate);
			} else {
				const endOfGivenDate = new Date(date.getTime())
				endOfGivenDate.setHours(23,59,59,59);
				return this.getDiffInHours(endOfGivenDate, startDate);
			}
		} else if (this.isSameDate(date, endDate)) {
			const startOfGivenDate = new Date(date.getTime());
			startOfGivenDate.setHours(0,0,0,0);
			return this.getDiffInHours(endDate, startOfGivenDate);
		}

		return 0;
	}

	private isSameDate(date1, date2) {
		return date1.getFullYear() === date2.getFullYear() &&
			  date1.getMonth() === date2.getMonth() &&
			  date1.getDate() === date2.getDate();
	}

	private getDiffInHours(date1, date2) {
		return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
	}
}
