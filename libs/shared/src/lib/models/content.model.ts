export class ContentModel {
  private _data;
  private _type = 'sections';
  private _id;
  private _entity;
  constructor( data ) {
    this._data = data;
    this._id = data._id;
    if ( typeof data !== 'object') {
      const isEntity = data.split('__');
      if ( isEntity.length === 2) {
        switch ( isEntity[0]) {
          case 'tutorials':
            this._type = isEntity[0];
            this._id = isEntity[1];
            this._data = null;
            break;
        }
      }
    }
  }

  get data() { return this._data; }
  get type() { return this._type; }
  get id() { return this._id; }

  set entity( entity ) { this._entity = entity; }
  get entity() { return this._entity; }
}
