import { ModuleFormModel } from './module-form-model';

export class CourseModel {
  private _isNew = true;
  private _id;
  private _title;
  private _link;
  private _creator;
  private _created;
  private _deck;
  private _tags;
  private _modules = [];
  private _published = false;
  private _state;
  private _thumb;
  private _cost;
  private _featured;
  public editing = {};
  constructor( fb, course ) {
    if ( course ) {
      this._isNew = false;
      this._id = course._id;
      this._title = course.title;
      this._deck = course.deck;
      this._link = course.link;
      this._tags = course.tags;
      this._state = course.state;
      this._created = course.created;
      this._thumb = course.thumb;
      this._cost = course.cost;
      this._creator = course.creator;
      this._featured = course.featured;
      this._modules = course.modules ? course.modules.map( mod => new ModuleFormModel(fb, mod)) : [];
    }
  }

  get isNew() { return this._isNew; }
  get id() { return this._id; }
  get title() { return this._title; }
  get deck() { return this._deck; }
  get link() { return this._link; }
  get tags() { return this._tags; }
  get creator() { return this._creator; }
  get created() { return this._created; }
  get cost() { return this._cost; }
  set cost( val ) { this._cost = val; }

  get featured() { return this._featured; }
  set featured( val ) { this._featured = val; }
  get state() { return this._state; }
  set state( val ) { this._state = val; }

  get modules() { return this._modules; }
  set modules( m ) { this._modules = m; }

  get published() { return this._published; }

  addModule( module ) {
    this._modules.push(module);
  }
  removeModule( id ) {
    let i = this._modules.map(m => m.id).indexOf( id );
    if( i !== -1 ) {
      this._modules.splice( i, 1);
    }
  }

  get thumb() { return this._thumb; }
  set thumb( val ) { this._thumb = val; }
}
