import { BaseEntity } from './base-entity';
import { Activity } from './activity';

export class Log extends BaseEntity {
	public dateStart: Date;
	public dateEnd?: Date;
	public activity: Activity;
}
