import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CourseService, CourseFormModel} from '@mahrio/shared';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { CourseMilestonesService } from "../../services/course-milestones.service";
import { SessionService} from '@mahrio/shared';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {

  private _course;
  public id;
  public edit;
  public section;
  public modules;
  public design;
  private _subs;
  private _user;
  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public milestoneService: CourseMilestonesService,
              private session: SessionService) {
    this._course = this.courseService.cachedEntity;
    if ( this._course ) {
      this.setupForm( this._course );
    }
    this.id = this.route.snapshot.params.id;
    this.edit = this.route.snapshot.params.edit;
  }
  get course() {
    return this._course;
  }

  ngOnInit() {
    this._subs = this.session.userProfile.subscribe( profile => {
      this._user = profile;
    });

    this.session.sessionReady.subscribe( ready => {
      if (!!ready) {
        this.courseService.list({id: this.id}).then( res => {
          this._course = res['courses'][0];
          this.setupForm(this._course);
        });
      }
    });
  }
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  milestone( $event ) {
  }
  setupForm( art? ) {
    this._course = new CourseFormModel(this.formBuilder, art );
  }

  submit( state ) {
    this.courseService.edit( this.id, state).then( res => {
      this.course.state = 'completePublish';
    }, err => {
      console.log('rejected');
    });
  }

  connectEntity() {

  }
  saved( $val ) {
    if ( this.course.state === 'completePlanning') {
      this.courseService.edit( this.id, 'completeDefine').then( () => {
        this.course.state = 'completeDefine';
        this.milestoneService.milestone('Articles').unlocked().active();
      });
    }
  }

  get ready() { return this._user; }

  gotoPublish() {
    this.courseService.edit( this.id, 'completeConnect').then( () => {
      this.course.state = 'completeConnect';
      this.milestoneService.milestone('Publish').unlocked().active();
    });
  }
}
