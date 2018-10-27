import {Component, OnDestroy, OnInit} from '@angular/core';
import { EntityService, PagerService} from '@mahrio/shared';
import { ActivatedRoute } from "@angular/router";
import { SessionService, FilterService, UserCreated, NoFilter,
  SubmitDesignFilter, SubmitSectionsFilter, SubmitCodeFilter, PublishedFilter } from '@mahrio/shared';
@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit, OnDestroy {
  public entities;
  public user;
  private _subs;
  public subNav = false;
  public view;
  public index = -1;
  private _readyEntities;
  private _readySession;
  public entitiesName;
  constructor(private entity: EntityService,
              public pager: PagerService,
              private route: ActivatedRoute,
              private filtered: FilterService,
              private session: SessionService) {
    this.entitiesName = this.entity.type[1];
    this.filtered.filters = [ new NoFilter(), new PublishedFilter() ];

    this.view = this.route.snapshot.params.type;
    this.subNav = !!this.view;
    const entities = this.entity.cachedList;
    if (entities && entities.length) {
      this.filtered.entities = entities;
      this.setFilters( this.view || 'none' );
    }
  }
  _loadList() {
    this.pager.items = this.filtered.filterEntities();
    this.pager.setPage(0);
    this._readyEntities = true;
    console.log( this.pager.items );
  }

  ngOnInit() {
    this._subs = this.session.userProfile.subscribe( profile => {
      this.user = profile;
      this.setFilters( null );
    });
    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this._readySession = true;
        this.entity.list({}).then( ents => {
          this.filtered.entities = ents[ this.entity.type[0].toLowerCase() ];
          this.setFilters( this.view || 'none' );
        });
      }
    });
  }
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  setFilters( view ) {
    switch ( view ) {
      case 'review':
        this.index = 2;
        this.filtered.filters = [ new NoFilter(), new SubmitSectionsFilter() ];
        break;
      case 'admin':
        this.index = 0;
        this.filtered.filters = [
          new NoFilter()
        ];
        break;
      default:
        this.index = 1;
        this.filtered.filters = [ new UserCreated(this.user.id) ];
    }
    if( this.user && view ) {
      this._loadList();
    }
  }
  removed( id ) {
    this.pager.items = this.pager.items
    this.pager.items.splice( this.pager.items.indexOf(this.pager.items.find( ent => ent._id === id )), 1 );
  }
  setSearchString( str ) {
    this.pager.items = this.filtered.setSearchString( str );
    this.pager.setPage(0);
  }
  first() {
    this.pager.first();
  }
  prev() {
    this.pager.prev();
  }
  turnPage( page ) {
    this.pager.setPage(page);
  }
  next() {
    this.pager.next();
  }
  last() {
    this.pager.last();
  }
  get ready() { return this._readyEntities && this._readySession; }
}
