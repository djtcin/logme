
export class DateTimeHelper {
	static formats = {
		Hours: 'hours',
		HoursMinutes: 'hours-minutes'
	}

  static isSameDate(date1, date2) {
		return date1.getFullYear() === date2.getFullYear() &&
			  date1.getMonth() === date2.getMonth() &&
			  date1.getDate() === date2.getDate();
	}

	static getDiffInHours(date1, date2) {
		return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
	}

	static formatTimeHours(time: number) : string {
		return time.toFixed(2) + 'h';
	}

	static formatTimeHoursMinutes(time: number) {
		let minutes = Math.floor((time - Math.floor(time)) * 60);
		return `${Math.floor(time)}:${minutes < 10 ? '0' : ''}${minutes}`;
	}

	static formatTime(time: number, format: string) {
		if (format == this.formats.Hours) {
			return this.formatTimeHours(time);
		} else {
			return this.formatTimeHoursMinutes(time);
		}
	}

}
