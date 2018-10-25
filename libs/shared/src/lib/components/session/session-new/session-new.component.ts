import { Component, Input } from '@angular/core';
import {FormBuilder } from "@angular/forms";
import { SessionService } from "../../../services/session.service";
import { Router} from "@angular/router";
import { Session } from '../../../models/session-modelo';

@Component({
  selector: 'm8io-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.css']
})
export class SessionNewComponent {
  @Input() course;
  public user;
  public errors = [];
  constructor(private formBuilder: FormBuilder, private session: SessionService, private router: Router) {
    this.user = new Session( this.formBuilder );
  }

  login() {
    this.errors = [];
    this.session.login( this.user.payload ).then( user => {
      if ( this.course ) {
        // navigate to transactions of course
        this.router.navigate(['/', 'courses', this.course.link ]);
      } else {
        this.router.navigate(['/tutorials']);
      }
    }, err => {
      this.user = new Session( this.formBuilder );
      this.errors = ['We cannot find an account with that email address'];
    });
  }
}
