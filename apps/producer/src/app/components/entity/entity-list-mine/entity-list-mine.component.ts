import {Component, EventEmitter, Input, Output} from '@angular/core';
import { EntityService, EnvService } from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-list-mine',
  templateUrl: './entity-list-mine.component.html',
  styleUrls: ['./entity-list-mine.component.scss']
})
export class EntityListMineComponent {
  @Input() entities;
  @Input() user;
  public entityName;
  @Output() removed = new EventEmitter();
  public toBeDeleted = {
    e: null,
    id: null,
    index: null
  };
  constructor(private env: EnvService, private entity: EntityService) {
    this.entityName = this.env.entity[1].toLowerCase();
  }

  remove( entity, index ) {
    this.toBeDeleted.e = entity;
    this.toBeDeleted.index = index;
    this.toBeDeleted.id = entity._id;
  }
  confirm( modal ) {
    this.entity.removeEntity( this.toBeDeleted.id ).then( () => {
      modal.hide();
      this.removed.emit( this.toBeDeleted.id );
    });
  }
  decline( modal ) {
    modal.hide();
    this.toBeDeleted = {
      id: null,
      index: null,
      e: null
    };
  }
}
