import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _token;
  private _cached;
  private _cList;
  private modules = '/api/v1/modules';
  private prefix = '/api/v1/courses';
  constructor(private http: HttpClient, private session: SessionService) {
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

  list( cfg ) {
    return this.http.get(this.prefix + (cfg.link ? '/' + cfg.link : '') + (!cfg.link && cfg.id ? '?id=' + cfg.id : ''), this.getHeaders(this._token))
      .toPromise();
  }
  create( payload ) {
    return this.http.post(this.prefix, {course: payload}, this.getHeaders(this._token))
      .toPromise();
  }
  edit( id, field, data?, query? ) {
    const payload = {};
    const q = query ? '?id=' + query : '';
    if ( data ) {
      payload[ field ] = data;
    }
    return this.http.put(`${this.prefix}/${id}/${field}${q}`, payload, this.getHeaders(this._token))
      .toPromise();
  }
  editModule( id, field, data?, query? ) {
    const payload = {};
    const q = query ? '?id=' + query : '';
    if ( data ) {
      payload[ field ] = data;
    }
    return this.http.put(`${this.modules}/${id}/${field}${q}`, payload, this.getHeaders(this._token))
      .toPromise();
  }
  remove( id) {
    return this.http.delete(this.prefix + `/${id}`, this.getHeaders(this._token))
      .toPromise();
  }
  removeModule( crs_id, mod_id ) {
    const q = mod_id ? '?id=' + mod_id : '';
    return this.http.delete(this.prefix + `/${crs_id}${q}`, this.getHeaders(this._token))
      .toPromise();
  }
}
