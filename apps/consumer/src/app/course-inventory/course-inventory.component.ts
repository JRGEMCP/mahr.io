import { Component } from '@angular/core';
import { SessionService, FilterService, NoFilter,
  CourseService, PagerService, PublishedFilter} from '@mahrio/shared';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'mahrio-course-inventory',
  templateUrl: './course-inventory.component.html',
  styleUrls: ['./course-inventory.component.scss']
})
export class CourseInventoryComponent {
  public entities;
  public user;
  public index = -1;
  private _readyEntities;
  private _readySession;
  constructor(private course: CourseService, public pager: PagerService, private route: ActivatedRoute, private filtered: FilterService,
              private session: SessionService) {

    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this.user = this.session.userProfile.getValue();
        this._readySession = true;
        this.course.list({}).then( entities => {
          this.filtered.entities = entities['courses'];
          this.setFilters( );
          this._loadList();
        });
      }
    });

    const courses = this.course.cachedList;
    if (courses && courses.length) {
      this.filtered.entities = courses;
      this._loadList();
    }
  }
  _loadList() {
    this.pager.items = this.filtered.filterEntities();
    this.pager.setPage(0);
    this._readyEntities = true;
  }

  setFilters( ) {
    this.filtered.filters = [
      new NoFilter(),
      new PublishedFilter()
    ];
  }
  setSearchString( str ) {
    this.pager.items = this.filtered.setSearchString( str );
    this.pager.setPage(0);
  }
  removed( id ) {
    this.pager.items = this.pager.items;
    this.pager.items.splice( this.pager.items.indexOf(this.pager.items.find( ent => ent._id === id )), 1 );
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
