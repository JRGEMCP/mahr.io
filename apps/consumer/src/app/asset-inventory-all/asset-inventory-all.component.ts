import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {CourseService, PaymentComponent, SessionService} from '@mahrio/shared';

@Component({
  selector: 'mahrio-asset-inventory-all',
  templateUrl: './asset-inventory-all.component.html',
  styleUrls: ['./asset-inventory-all.component.scss']
})
export class AssetInventoryAllComponent {
  @Input() entities;
  @Input() user;
  private mRef;
  public entityName;
  constructor(public entity: CourseService, private mSvc: BsModalService, private session: SessionService) {
    this.entityName = this.session.env['c']['asset'][0];
  }

  purchase( entity ) {
    this.mRef = this.mSvc.show( PaymentComponent, {
      initialState: {
        pay: {
          amount: entity.cost,
          id: entity._id,
          user: this.user,
          product: entity
        }
      }
    });
  }

}
