import { Component, OnInit } from '@angular/core';
import {CourseFormModel, CourseService} from '@mahrio/shared';
import { ActivatedRoute} from "@angular/router";
import {FormBuilder} from '@angular/forms';
import {SessionService} from '@mahrio/shared';
import {PaymentComponent} from '../../components/payment/payment.component';
import {BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {
  private link;
  private _course;
  private mRef;
  public user;
  private _ready = false;
  constructor(private courseService: CourseService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private session: SessionService,
              private mSvc: BsModalService) {
    this._course = this.courseService.cachedEntity;
    if ( this._course ) {
      this.setupForm( this._course );
    }
    this.link = this.route.snapshot.params.link;
  }

  setupForm( art? ) {
    this._course = new CourseFormModel(this.formBuilder, art );
  }

  ngOnInit() {
    this.session.sessionReady.subscribe( ready => {
      if (!!ready) {
        this.user = this.session.userProfile.getValue();
        this.courseService.list({link: this.link}).then( res => {
          this._course = res['course'];
          this.setupForm(this._course);
          this._ready = true;
          if ( this.session.purchase ) {
            this.session.purchase = false;
            this.purchase();
          }
        });
      }
    });
  }
  get isEnrolled() {
    return this.user && this.course && (this.user.checkEnrolled(this.course)
      || this.user.courseOwner(this.course));
  }
  get course() {
    return this._course;
  }
  get ready() {
    return this._ready;
  }
  purchase( ) {
    this.mRef = this.mSvc.show( PaymentComponent, {
      initialState: {
        pay: {
          amount: this.course.cost,
          id: this.course.id,
          user: this.user,
          product: this.course
        }
      }
    });
  }
}
