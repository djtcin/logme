import { DateTimeHelper } from './date-time.helper';

/**
 * Settings, different from other entities, behaves like a singleton data.
 */
export class Settings {
	constructor() {
		this.timeFormat = DateTimeHelper.formats.HoursMinutes;
		this.userName = '';
		this.sprint = '1';
	}
	
	timeFormat: string;
	userName: string;
	sprint: string;
}
