import { Component, Input, NgZone, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SessionService} from '../../services/session.service';
import { StripeService} from '../../services/stripe.service';
import { TransactionService} from '../../services/transaction.service';

class PaymentModel {
  private _payment_amount;
  private _user;
  private _product;
  constructor(data ) {
    this._payment_amount = data.amount;
    this._user = data.user;
    this._product = data.product;
  }
  get amount() { return this._payment_amount; }
  get user() { return this._user; }
  get product() { return this._product; }
}

@Component({
  selector: 'mahrio-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  @Input() pay;
  public payment;
  private card;
  public ready;
  public hasPay = false;
  constructor(private bsRef: BsModalRef, private stripe: StripeService, private session: SessionService,
              private ngZone: NgZone, private transactionService: TransactionService ) {

  }

  ngOnInit() {
    this.payment = new PaymentModel( this.pay);
    if ( !this.payment.user.stripeId ) {
      this.card = this.stripe.stripe.elements().create('card');
      this.card.mount('#card-element');
      this.ngZone.runOutsideAngular(() => {
        this.card.addEventListener('change', (event) => {
          this.ngZone.run( () => {
            this.ready = event.complete;
          });
        });
      });
    }
  }

  charge() {
    if ( this.payment.amount ) {
      if ( this.payment.user.stripeId ) {
        this.stripe.user_charge( this.payment.amount * 100, this.pay.id)
          .then( (res) => {
            this.hasPay = true;
            this.session.updateCourses( this.pay.id );
          });
      } else {
        this.stripe.create_user_and_charge( this.card, this.payment.amount * 100, this.pay.id )
          .then( res => {
            this.hasPay = true;
            this.session.updateCourses( this.pay.id );
            this.session.updateHasStripe( );
          });
      }
    } else {
      this.transactionService.create(this.pay.id).then( (res) => {
        this.hasPay = true;
        this.session.updateCourses( this.pay.id );
      });
    }
  }

  close() {
    this.bsRef.hide();
  }
}
