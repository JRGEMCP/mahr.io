import { Component, Input } from '@angular/core';
import {EnvService} from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-list-submitted',
  templateUrl: './entity-list-submitted.component.html',
  styleUrls: ['./entity-list-submitted.component.scss']
})
export class EntityListSubmittedComponent {
  @Input() entities;
  @Input() user;
  @Input() view;
  public link;
  constructor(private env: EnvService) {
    this.link = this.env.entity;
  }

}
