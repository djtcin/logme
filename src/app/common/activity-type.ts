import { BaseEntity } from './base-entity';

export class ActivityType extends BaseEntity {
	name: string;
	order: number;

	constructor(obj: BaseEntity = null) {
		super();
		Object.assign(this, obj);
	}
}
