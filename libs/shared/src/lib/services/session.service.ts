import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { LocalStorageService } from 'ngx-localstorage';
import { LogService} from "./log.service";
import { BehaviorSubject } from "rxjs";
import { tap } from 'rxjs/operators';
import { StripeService } from './stripe.service';
import { UserModel } from '../models/user.model';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _session;
  private _token;
  private _user;
  private routeUrl = '/api/v1/session';
  private _sessionReady;
  private _course;
  private _purchase;
  private _rights = null;
  private _env = {
    c: ['Asset', 'Assets']
  };
  constructor( private store: LocalStorageService,
               private http: HttpClient,
               private log: LogService,
               private s: StripeService,
               private modal: BsModalService) {
    this._token = new BehaviorSubject(null);
    this._user = new BehaviorSubject(null);
    this._sessionReady = new BehaviorSubject(null);

    let skip = null;
    if ( this.store.get('Authorization') ) {
      skip = true;
      this.fetchUser( this.store.get('Authorization') ).then( session => {
        this._sessionReady.next(true);
      }, err => {
        this.store.remove('Authorization');
        this._sessionReady.next(true);
      });
    }
    if ( !skip ) {
      this._sessionReady.next(true);
    }
  }
  get env() { return this._env; }
  registerEnvironment( key, val ) { this._env[key] = val; }

  get sessionReady() {
    return this._sessionReady;
  }
  set course( val ) { this._course = val; }
  get course( ) { return this._course; }

  set userRights( val ) {
    this._rights = val;
  }
  openRights( type ) {
    this.modal.show( this._rights[type], {class: 'modal-lg'} );
  }
  getHeaders( token ) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
  }
  get userSession() {
    return this._token;
  }
  get userProfile() {
    return this._user;
  }
  set purchase( val ) { this._purchase = val; }
  get purchase() { return this._purchase; }
  updateCourses( courseId ) {
    this._session.courses.push( courseId );
    this._user.next( this._session );
  }
  updateHasStripe() {
    this._session.stripeId = true;
    this._user.next( this._session );
  }
  updateSession( session ) {
    this._session = new UserModel(session);
    this._user.next( this._session );
    if ( this._session.token ) {
      this._token.next( this._session.token );
      this.store.set('Authorization', this._session.token);
      this.s.token = this._session.token;
    } else {
      this._token.next( null );
      this.store.remove('Authorization');
    }

  }
  fetchUser(token) {
    return this.http.get( this.routeUrl + '/user', this.getHeaders( token ))
      .pipe(
        tap( // Log the result or error
          data => {
            data['token'] = 'Bearer ' + data['token'];
            this.updateSession( data );
          },
          error => { console.log('error', error); }
        )
      ).toPromise();
  }
  login( user ) {
    return this.http.post(this.routeUrl + '/login', user)
      .pipe(
        tap( // Log the result or error
          (res) => this.updateSession( res['user'] ),
          error => { console.log('error', error); }
        )
      ).toPromise();
  }
  register( user ) {
    return this.http.post(this.routeUrl + '/register', {user: user})
      .pipe(
        tap( // Log the result or error
          data => {
            this.updateSession( data );
          },
          error => { console.log('error', error); }
        )
      ).toPromise();
  }
  recoverPassword(email) {
    return this.http.post(this.routeUrl + '/recover-password', {email: email})
      .toPromise();
  }
  isValidToken( token ) {
    return this.http.post(this.routeUrl + '/is-valid-token', {token: token})
      .toPromise();
  }
  changePassword(token, password) {
    return this.http.post(this.routeUrl + '/change-password', {token: token, password: password})
      .pipe(
        tap( // Log the result or error
          data => {
            this.updateSession( data['user'] );
          },
          error => { console.log('error', error); }
        )
      ).toPromise();
  }
  confirmAccount( token ) {
    return this.http.post( this.routeUrl + '/confirm-account', {token: token} ).toPromise();
  }
  updatePassword( passwords ) {
    return this.http.post(this.routeUrl + '/update-password', {passwords: passwords},
      this.getHeaders(this._token.getValue())).toPromise();
  }
  logout( all? ) {
    const action = all ? 'log-off-all-devices' : 'logout';
    return this.http.post(this.routeUrl + `/${action}`, {}, this.getHeaders(this._token.getValue()) )
      .pipe(
        tap( // Log the result or error
          data => {
            this._token.next( null );
            this._user.next( null );
            this.store.remove('Authorization');
          },
          error => { console.log('error', error); }
        )
      ).toPromise();
  }
}
