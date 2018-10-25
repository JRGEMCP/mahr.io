export class EntityModelo {
  private _isNew = true;
  private _id;
  private _title;
  private _deck;
  private _link;
  private _tags;
  private _state;
  private _sections;
  private _scenario;
  private _design;
  private _code;
  private _featured;
  private _thumb;
  public editing = {};
  constructor( entity ) {
    if ( entity ) {
      this._id = entity._id;
      this._isNew = false;
      this._title = entity.title;
      this._deck = entity.deck;
      this._link = entity.link;
      this._tags = entity.tags;
      this._state = entity.state;
      this._sections = entity.sections || [];
      this._scenario = entity.scenario;
      this._design = entity.design || '';
      this._code = entity.code;
      this._thumb = entity.thumb;
      this._featured = entity.featured || false;
    }
  }
  get id() { return this._id; }
  get isNew() { return this._isNew; }
  get title() { return this._title; }
  get deck() { return this._deck; }
  get link() { return this._link; }
  get tags() { return this._tags; }
  get featured() { return this._featured; }
  set featured(val) { this._featured = !!val; }

  get state() { return this._state; }
  set state( val ) { this._state = val; }

  get sections() { return this._sections; }
  set sections( sec ) { this._sections = sec; }

  get scenario() { return this._scenario; }
  set scenario( scenario ) { this._scenario = scenario; }
  get design() { return this._design; }
  set design( design ) {this._design = design; }

  get code() { return this._code; }

  get thumb() { return this._thumb; }
  set thumb( val ) { this._thumb = val; }
}
