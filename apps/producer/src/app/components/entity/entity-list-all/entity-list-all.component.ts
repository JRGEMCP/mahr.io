import { Component, Input } from '@angular/core';
import { SessionService} from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-list-all',
  templateUrl: './entity-list-all.component.html'
})
export class EntityListAllComponent {
  @Input() entities;
  @Input() user;
  public entityName;
  constructor(public session: SessionService) {
    this.entityName = this.session.env['c']['asset'][0].toLowerCase();
  }

}
