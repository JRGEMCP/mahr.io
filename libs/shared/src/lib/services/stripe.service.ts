import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { WindowService } from './window.service';
import * as Stripe from 'stripe';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  public stripe;
  private tkn;
  constructor(private http: HttpClient, private w: WindowService, private ngZone: NgZone) {
    this.http.get('/api/v1/stripe/pub_key').toPromise().then( key => {
      this.ngZone.runOutsideAngular(() => {
        this.stripe = this.w.nativeWindow['Stripe'](key['pub_key']);
      });
    });
  }

  set token( val ) {
    this.tkn = val;
  }

  create_user_and_charge( card, cost, id ) {
    const headers = new HttpHeaders({
      'Authorization': this.tkn
    });

    return new Promise((resolve, reject) => {
      this.stripe.createToken(card).then( res => {
        this.http.post('/api/v1/stripe/create-user-and-charge', {token: res['token'].id, cost: cost, id: id}, {headers: headers }).toPromise()
          .then( res2 => {
            resolve( res2 );
          }, err => {
            reject(err);
          });
      }, err => {
        reject(err);
      });
    });
  }
  user_charge( cost, id) {
    const headers = new HttpHeaders({
      'Authorization': this.tkn
    });
    return this.http.post('/api/v1/stripe/user-charge', {cost: cost, id: id}, {headers: headers }).toPromise();
  }
}
