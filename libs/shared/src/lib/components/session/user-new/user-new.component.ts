import { Component, Input } from '@angular/core';
import {SessionService} from '../../../services/session.service';
import { CourseService } from '../../../services/course.service';
import {FormBuilder } from "@angular/forms";
import {Router} from "@angular/router";
import {Session} from '../../../models/session-modelo';

@Component({
  selector: 'm8io-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent {
  public user;
  public errors = [];
  @Input() course;
  constructor( private session: SessionService, private formBuilder: FormBuilder, private router: Router,
               private courseService: CourseService) {
    this.user = new Session( this.formBuilder );
  }
  register() {
    this.session.register( this.user.payload ).then( user => {
      this.router.navigate(['/tutorials']);
      if (this.course.link ) {
        this.router.navigate(['/', 'courses', this.course.link ], {queryParams: {purchase: true}});
      } else {
        this.router.navigate(['/tutorials']);
      }
    }, err => {
      this.user = new Session( this.formBuilder );
      this.errors = ['We are having trouble registering. Please <a href="mailto:support@mahr.io">contact us</a>.'];
    });
  }
  openRights( type ) {
    this.session.openRights( type );
  }
  setCourseId( val ) {
    this.session.course = {id: val};
  }
}
