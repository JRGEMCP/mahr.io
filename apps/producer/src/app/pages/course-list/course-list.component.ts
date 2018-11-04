import { Component } from '@angular/core';
import {CourseService, PagerService, PublishedFilter, SubmitSectionsFilter} from '@mahrio/shared';
import { ActivatedRoute } from "@angular/router";
import { SessionService, FilterService, UserCreated, NoFilter } from '@mahrio/shared';
@Component({
  selector: 'm8io-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  public entities;
  public user;
  private _subs;
  public subNav = false;
  public view;
  public index = -1;
  private _readyEntities;
  private _readySession;
  constructor(private course: CourseService, public pager: PagerService, private route: ActivatedRoute, private filtered: FilterService,
              private session: SessionService) {
    this.view = this.route.snapshot.params.type;
    this.subNav = !!this.view;

    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this.user = this.session.userProfile.getValue();
        this._readySession = true;
        this.course.list({}).then( entities => {
          this.filtered.entities = entities['courses'];
          this.setFilters( this.view );
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

  setFilters( view ) {
    switch (view) {
      case 'all':
        this.filtered.filters = [new NoFilter()];
        break;
      case 'mine': console.log('here');
        this.filtered.filters = [new UserCreated(this.user.id)];
        this.index = 6;
        break;
      case 'enrolled':
        this.index = 0;
        this.filtered.filters = [
          new NoFilter()
        ];
        break;
      default:
        this.filtered.filters = [new UserCreated(this.user.id)];
    }
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
