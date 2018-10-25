import { FilterModelo } from "./filter.modelo";

export class SearchFilter extends FilterModelo {
  private _searchString;
  constructor( str ) {
    super('filter.search', 'AND', () => {});
    this.searchString = str;
    this.filter = entity => new RegExp(this.searchString, 'i').test( entity.title);
  }

  get searchString() {
    return this._searchString;
  }
  set searchString( str ) {
    this._searchString = str;
  }
}
