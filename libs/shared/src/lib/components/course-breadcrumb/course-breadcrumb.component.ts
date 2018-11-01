import { Component, Input, OnInit} from '@angular/core';
import { SessionService} from "../../services/session.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'mahrio-course-breadcrumb',
  templateUrl: './course-breadcrumb.component.html',
  styleUrls: ['./course-breadcrumb.component.scss']
})
export class CourseBreadcrumbComponent implements OnInit {
  @Input() course;
  @Input() user;
  public url;
  public entities;
  public _isUserOwner;
  constructor(private route: ActivatedRoute, private session: SessionService) {
    this.entities = this.session.env['c']['asset'][0];
    this.course = {};
  }
  ngOnInit() {
    this.url = this.route.snapshot.url;
    this.session.sessionReady.subscribe( ready => {
      if (!!ready) {
        this.user = this.session.userProfile.getValue();
        if( this.user && this.user.courseOwner(this.course) ) {
          this._isUserOwner = true;
        }
      }
    });
  }
  get isUserOwner() {
    return this._isUserOwner;
  }
  get isHome() {
    return this.url.length === 2;
  }
  get isModule() {
    return this.url.length === 4;
  }
  get action() {
    switch( this.url.length ) {
      default:
        return this.course ? this.course.title : '';
    }
  }

}
