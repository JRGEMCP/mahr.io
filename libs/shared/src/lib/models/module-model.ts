import { ContentModel } from './content.model';

export class ModuleModel {
  private _isNew = true;
  private _id;
  private _title;
  private _deck;
  private _link;
  private _content;
  public editing = {};
  constructor( module ) {
    if ( module ) {
      this._isNew = false;
      this._id = module._id;
      this._title = module.title;
      this._deck = module.deck;
      this._link = module.link;
      this._content = module.content ? module.content.map( cont => new ContentModel(cont) ) : [];
    }
  }
  get isNew() { return this._isNew; }
  get id() { return this._id; }
  get title() { return this._title; }
  set title(val) { this._title = val; }
  get deck() { return this._deck; }
  set deck( val ) { this._deck = val; }
  get link() { return this._link; }
  set link(val) { this._link = val; }
  get content() { return this._content; }
}
