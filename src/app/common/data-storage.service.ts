import { Injectable } from '@angular/core';

import { ActivityType } from './activity-type';
import { Activity } from './activity';
import { Log } from './log';
import { BaseEntity } from './base-entity';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

	getEntity(id: string) : BaseEntity {
		let flatItem = localStorage.getItem(id);
		return JSON.parse(flatItem);
	}

	setEntity(entity: BaseEntity) {
		localStorage.setItem(entity.id, JSON.stringify(entity));
	}

	removeEntity(entity: BaseEntity) {
		localStorage.removeItem(entity.id);
	}

	getList(typeName: string) : BaseEntity[] {
		const storageValue = localStorage.getItem(typeName);

		if (!storageValue) {
			return [];
		}
		
		return storageValue.split(';').map(id => this.getEntity(id));
	}

	setList(typeName: string, entities: BaseEntity[]) {
		localStorage.setItem(typeName, entities.map(e => e.id).join(';'));
	}
}
