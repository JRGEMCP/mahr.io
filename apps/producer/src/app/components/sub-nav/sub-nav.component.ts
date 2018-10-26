import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {SessionService} from '@mahrio/shared';
import {EnvService} from '@mahrio/shared';

@Component({
  selector: 'm8io-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css']
})
export class SubNavComponent implements OnInit {
  @Input() entity;
  @Input() index;
  public user;
  public cfg;
  constructor(private session: SessionService, private env: EnvService ) {
    this.cfg = this.env.entity[1];
  }

  ngOnInit() {
    this.session.userProfile.subscribe( session => {
      this.user = session;
    });
  }
  get isInstructor() {
    return this.user.access.indexOf('instructor') !== -1;
  }
  get isModerator() {
    return this.isInstructor || this.user.access.indexOf('moderator') !== -1;
  }
}
