import { Component, Input } from '@angular/core';
import { CourseService} from '@mahrio/shared';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PaymentComponent } from '../../payment/payment.component';

@Component({
  selector: 'm8io-course-list-all',
  templateUrl: './course-list-all.component.html'
})
export class CourseListAllComponent {
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
