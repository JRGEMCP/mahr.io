import {Component, EventEmitter, Input, Output} from '@angular/core';
import { EntityService, EnvService } from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-list-admin-all',
  templateUrl: './entity-list-admin-all.component.html',
  styleUrls: ['./entity-list-admin-all.component.scss']
})
export class EntityListAdminAllComponent {
  @Input() entities;
  @Output() removed = new EventEmitter();
  @Input() user;
  public link;
  public toBeDeleted = {
    e: null,
    id: null,
    index: null
  };
  constructor(private env: EnvService, private entity: EntityService) {
    this.link = this.env.entity;
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
