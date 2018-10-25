import { Injectable } from '@angular/core';
const ENTITY = ['entity', 'entities'];
const STATES = [
  {plan: ['completePlanning']},
  {defn: ['setSections', 'submitSections']},
  {revr: 'completeDefine'},
  {publ: 'completePublish'}
];
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private _entity;
  private _editor;
  private _states;
  constructor() {
    this._entity = ENTITY;
    this._states = STATES;
    this._editor = 'quill';
  }

  set env( entity ) {
    this._entity = entity.entity || ENTITY;
    this._states = entity.states || STATES;
    this._editor = entity.editor || this._editor;
  }
  get entity() {
    return this._entity;
  }
  get editor() { return this._editor; }
  get states() {
    return this._states;
  }
}
