import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { SessionService } from '../services/session.service';
import {tap} from "rxjs/operators";
import {EnvService} from './env.service';
@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private _token;
  private _cached;
  private _cList;
  private _prefix = '/api/v1/';
  private _type;
  constructor(private http: HttpClient, private session: SessionService) {
    this._prefix += this.session.env['c']['asset'][0].toLowerCase();
    this._type = this.session.env['c']['asset'];
    this._cList = [];
    this.session.userSession.subscribe( sess => {
      this._token = sess;
    });
  }
  getHeaders( token ) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if ( token ) {
      headers['Authorization'] = token;
    }
    return {
      headers: new HttpHeaders(headers)
    };
  }
  get cachedList() { return this._cList; }
  set cacheEntity(e) { this._cached = e; }
  get cachedEntity() { return this._cached; }
  get type() { return this._type; }
  list( cfg) {
    return this.http.get(this._prefix + (cfg.link?'/'+cfg.link:'')+(!cfg.link && cfg.id ? '?id='+cfg.id:''), this.getHeaders(this._token))
      .pipe(
        tap( // Log the result or error
          data => {

            this._cList = data['articles'];
          },
          error => { console.log('error', error); }
        )
      )
      .toPromise();
  }
  create( data ) {
    const payload = {};
    payload[ this.type[0].toLowerCase() ] = data;
    return this.http.post( this._prefix, payload, this.getHeaders(this._token))
      .toPromise();
  }
  edit( id, field, data?, query? ) {
    const payload = {};
    const q = query ? '?id=' + query : '';
    if ( field === 'featured' ) {
      payload[ field ] = data;
    } else if ( data ) {
      payload[ field ] = data;
    }
    return this.http.put(`${this._prefix}/${id}/${field}${q}`, payload, this.getHeaders(this._token))
      .toPromise();
  }

  removeEntity( id ) {
    return this.http.delete(`${this._prefix}/${id}`, this.getHeaders(this._token))
      .toPromise();
  }
  removeSection( art_id, sec_id ) {
    const q = sec_id ? '?id=' + sec_id : '';
    return this.http.delete(`${this._prefix}/${art_id}${q}`, this.getHeaders(this._token))
      .toPromise();
  }

}
