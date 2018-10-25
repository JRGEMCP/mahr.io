import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SessionService} from "./session.service";
import {EnvService} from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private _token;
  private _cached;
  private _cList;
  private prefix = '/api/v1/modules';
  private sections = '/api/v1/sections';
  private entity;
  constructor(private http: HttpClient, private session: SessionService, private env: EnvService) {
    this._cList = [];
    this.session.userSession.subscribe( sess => {
      this._token = sess;
    });
    this.entity += env.entity[0].toLowerCase();
  }
  getHeaders( token ) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
  }
  get cachedList() { return this._cList; }
  set cacheEntity(e) { this._cached = e; }
  get cachedEntity() { return this._cached; }

  post( payload ) {
    return this.http.post(this.prefix, payload, this.getHeaders(this._token))
      .toPromise();
  }
  edit( id, field, data?, query? ) {
    const payload = {};
    const q = query ? '?id=' + query : '';
    if ( data ) {
      payload[ field ] = data;
    }
    return this.http.put(this.prefix + `/${id}/${field}${q}`, payload, this.getHeaders(this._token))
      .toPromise();
  }
  addContent(field, data) {
    const payload = {};
    if ( data ) {
      payload[ field ] = data;
    }
    return this.http.post(this.sections, payload, this.getHeaders(this._token))
      .toPromise();
  }
  editContent(id, field, data) {
    const payload = {};
    if ( data ) {
      payload[ field ] = data;
    }
    return this.http.put(this.sections + `/${id}/body`, payload, this.getHeaders(this._token))
      .toPromise();
  }
  removeSectionContent(id) {
    return this.http.delete(this.sections + `/${id}`, this.getHeaders(this._token))
      .toPromise();
  }

  remove( id, courseId) {
    return this.http.delete(this.prefix + `/${id}?courseId=` + courseId, this.getHeaders(this._token))
      .toPromise();
  }
  removeContent( mod_id, sec_id ) {
    const q = sec_id ? '?id=' + sec_id : '';
    return this.http.delete(this.prefix + `/${mod_id}${q}`, this.getHeaders(this._token))
      .toPromise();
  }
}
