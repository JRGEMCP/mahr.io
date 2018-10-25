import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _token;
  private _prefix = '/api/v1/transactions';
  constructor(private http: HttpClient, private session: SessionService) {
    this.session.userSession.subscribe( sess => {
      this._token = sess;
    });
  }

  create( courseId ) {
    const headers = new HttpHeaders({
      'Authorization': this._token
    });
    return this.http.post(`${this._prefix}/${courseId}`, {}, {headers: headers}).toPromise();
  }
}
