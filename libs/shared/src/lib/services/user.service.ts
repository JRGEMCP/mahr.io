import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _token;
  private _cached;
  private _cList;
  private _prefix = '/api/v1/users';
  private _type;
  constructor(private http: HttpClient, private session: SessionService) {
    this.session.userSession.subscribe( sess => {
      this._token = sess;
    });
  }

  removeSelf() {
    const headers = new HttpHeaders({
      'Authorization': this._token
    });
    return this.http.delete(this._prefix + '/me', {headers: headers}).toPromise();
  }
}
