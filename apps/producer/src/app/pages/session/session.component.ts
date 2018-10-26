import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService, SessionService} from '@mahrio/shared';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  public type;
  private _course = {};
  constructor(private route: ActivatedRoute, private session: SessionService,
              private courseService: CourseService) {
    this.type = this.route.snapshot.params.any;
    this._course = this.courseService.cachedEntity || {};
  }

  ngOnInit() {
    if ( !this._course['id'] ) {
      this.courseService.list({id: this.session.course}).then( res => {
        this._course = res['courses'][0] || {};
      });
    }
  }
  get course() { return this._course; }
}
