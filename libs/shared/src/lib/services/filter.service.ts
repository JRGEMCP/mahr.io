import { Injectable } from '@angular/core';
import { sortByLastUpdate } from '../filters/sort-last-update.filter';
import { FavoriteFilter } from "../filters/favorite.filter";
import { SearchFilter } from "../filters/search.filter";
import { BehaviorSubject } from 'rxjs';
import { EntityModelo } from "../models/entity.modelo";
// import pull from 'lodash-es/pull';
const SEARCH = 'filter.search', FAVORITE = 'filter.favorite';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _filters = [];
  private _favorites;
  private _entities: Array<EntityModelo>;
  public onSet = new BehaviorSubject(null);
  constructor( ) {}

  get entities( ) {
    return this._entities;
  }
  set entities( eArray ) {
    this._entities = eArray;
    this.onSet.next( true );
  }
  get hasEntities( ) {
    return this._entities && this._entities.length > 0;
  }
  removeEntity( api ) {
    //pull( this._apis, api);
    //this.onSet.next( true );
  }
  addNewEntity( api ) {
    this._entities.unshift( api );
  }
  set favorites( fArray ) {
    this._favorites = fArray;
  }
  set filters( fArray ) {
    this._filters = fArray;
  }

  filterEntities( filters? ) {
    const _filters = filters || this._filters;
    let apis = [];

    // Apply all the OR filters by concatenating all filtered from the original array
    _filters.forEach(filterModel => {
      if (filterModel.isOr) {
        apis.push(...this._entities.filter(filterModel.filter));
      }
    });

    // After applying OR filters, remove duplicates from the array
    apis = apis.filter((api, index, array) => array.indexOf(api) === index);

    // Then apply all the AND filters to the return of the OR filters
    _filters.forEach(filterModel => {
      if (filterModel.isAnd) {
        apis = apis.filter(filterModel.filter);
      }
    });

    return apis.sort( sortByLastUpdate );
  }

  setSearchString ( str ) {
    if (str !== '') {
      if ( this.isFilteringBySearch ) {
        this._filters.find(f => f.name === SEARCH).searchString = str;
      } else {
        this._filters.push(new SearchFilter(str));
      }
    } else {
      this._filters = this._filters.filter(f => f.name !== SEARCH);
    }
    return this.filterEntities();
  }
  setFavorites( active ) {
    if ( active ) {
      this._filters.push(new FavoriteFilter(this._favorites));
    } else {
      this._filters = this._filters.filter(f => f.name !== FAVORITE);
    }
    return this.filterEntities();
  }
  get hasFavoriteFilter() {
    return this._filters.some( f => f.name === FAVORITE);
  }
  toggleFavorite( entity ) {
    const payload = { favorites: [entity.id]};
    const apiObj = this._entities.find( item => item === entity);
    const promise = new Promise( (res, rej) => {
      if ( entity.favorite ) {
        // this.lifecycleEngine.dropFavorite( payload ).then( () => {
        //   apiObj.favorite = false;
        //   this._favorites.splice(this._favorites.indexOf(api.favoriteId), 1);
        //   if ( this.hasFavoriteFilter ) {
        //     this._filters.find( f => f.name === FAVORITE).favorites = this._favorites;
        //   }
        //   res( this.filteredEntities() );
        // }, err => {
        //   rej();
        // });
      } else {
        // this.lifecycleEngine.addFavorite( payload ).then( () => {
        //   apiObj.favorite = true;
        //   api.favorite = true;
        //   this._favorites.push(api.favoriteId);
        //   res( this.filteredEntities() );
        // }, err => {
        //   rej();
        // });
      }
    });
    return promise;
  }
  get isFilteringByFavorite() {
    return this._filters.some(f => f.name === FAVORITE);
  }
  get isFilteringBySearch() {
    return this._filters.some(f => f.name === SEARCH);
  }
  get searchString() {
    if ( this.isFilteringBySearch ) {
      return this._filters.find(f => f.name === SEARCH).searchString;
    }
    return '';
  }
}
