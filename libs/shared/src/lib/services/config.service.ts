import { Injectable } from '@angular/core';

const ENTITY = ['entity', 'entities'];
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _entity;
  constructor() {
    this._entity = ENTITY;
  }

  set config( env ) {
    this._entity = env.entity || ENTITY;
  }
  get entity() {
    return this._entity;
  }
}
