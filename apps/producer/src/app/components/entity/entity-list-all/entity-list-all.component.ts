import { Component, Input } from '@angular/core';
import { EntityService} from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-list-all',
  templateUrl: './entity-list-all.component.html'
})
export class EntityListAllComponent {
  @Input() entities;
  @Input() user;
  public entityName;
  constructor(public entity: EntityService) {
    this.entityName = this.entity.type[1];
  }

}
