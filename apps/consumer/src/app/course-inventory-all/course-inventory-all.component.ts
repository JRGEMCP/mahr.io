import { Component, Input } from '@angular/core';
import { PaymentComponent, CourseService} from '@mahrio/shared';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'mahrio-course-inventory-all',
  templateUrl: './course-inventory-all.component.html'
})
export class CourseInventoryAllComponent {
  @Input() entities;
  @Input() user;
  private mRef;
  constructor(public entity: CourseService, private mSvc: BsModalService) { }

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
