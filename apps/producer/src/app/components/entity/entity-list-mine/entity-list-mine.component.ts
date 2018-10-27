import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EntityService, EnvService, SessionService} from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-list-mine',
  templateUrl: './entity-list-mine.component.html',
  styleUrls: ['./entity-list-mine.component.scss']
})
export class EntityListMineComponent {
  @Input() entities;
  @Input() user;
  @Output() removed = new EventEmitter();
  public asset;
  public toBeDeleted = {
    e: null,
    id: null,
    index: null
  };
  constructor(private session: SessionService, private entity: EntityService) {
    this.asset = this.session.env['c']['asset'][0].toLowerCase();
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
