import { Component } from '@angular/core';
import { EntityService, CourseService, FilterService, NoFilter, PagerService, PublishedFilter, SessionService, FeaturedFilter} from '@mahrio/shared';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'mahrio-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public articles;
  public courses;
  public entities;
  public user;
  private _subs;
  public subNav = false;
  public view;
  public index = -1;
  private _readyEntities;
  private _readySession;
  private _readyCourses;
  constructor(private entity: EntityService, private course: CourseService, public pager: PagerService,
              private route: ActivatedRoute, private filtered: FilterService, private session: SessionService,
              private router: Router) {
    this.filtered.filters = [
      new NoFilter(),
      new PublishedFilter(),
      new FeaturedFilter()
    ];
    this.view = this.route.snapshot.params.type;
    this.subNav = !!this.view;
    this._subs = this.session.userProfile.subscribe( profile => {
      this.user = profile;
    });
    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this._readySession = true;
        this.entity.list({}).then( ents => {
          this._loadList1( ents[ this.entity.type[0].toLowerCase() ] );
        });
        this.course.list({}).then( ents => {
          this._loadList2( ents['courses'] );
        });
      }
    });

    const entities = this.entity.cachedList;
    if (entities && entities.length) {
      this._loadList1( entities);
    }
    const courses = this.course.cachedList;
    if (courses && courses.length) {
      this._loadList2( courses);
    }
  }
  _loadList1( entities ) {
    this.filtered.entities = entities;
    this.articles = this.filtered.filterEntities();
    this._readyEntities = true;
  }
  _loadList2( entities ) {
    this.filtered.entities = entities;
    this.courses = this.filtered.filterEntities();
    this._readyCourses = true;
  }
  goTo( link ) {
    this.router.navigate(['/', this.entity.type[0].toLowerCase(), link]);
  }
  goToCourse( link ) {
    this.router.navigate(['/', 'courses', link]);
  }
  get readyE() { return this._readyEntities; }
  get readyC() { return this._readyCourses; }

  get entityName() {
    return this.entity.type[0];
  }
  edit() {

  }
}
