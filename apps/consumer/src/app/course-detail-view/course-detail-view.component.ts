import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { SessionService, EntityService, CourseService } from '@mahrio/shared';

@Component({
  selector: 'mahrio-course-detail-view',
  templateUrl: './course-detail-view.component.html',
  styleUrls: ['./course-detail-view.component.scss']
})
export class CourseDetailViewComponent implements OnInit {
  @Input() course;
  @Input() livePreview;
  @Input() user;
  @Input() disabledContent;
  @Output() purchase = new EventEmitter();
  private entities;
  private _ready;
  private _eType;
  public viewEntity;
  constructor(private session: SessionService, private entity: EntityService,
              private courseService: CourseService) {
    this._eType = this.entity.type[1].toLowerCase();

  }

  ngOnInit() {
    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this.entity.list({}).then( ents => {
          this.entities = ents[ this._eType ];
          this.populateModuleContent();
          this._ready = true;
        });
      }
    });
  }
  get ready() {
    return this._ready;
  }
  set cacheCourse( val ) {
    this.courseService.cacheEntity = val;
  }
  populateModuleContent() {
    this.course.modules.map( mod => {
      mod.content.map( cont => {
        if ( cont.type === this._eType ) {
          cont.entity = this.entities.find( ent => ent._id === cont.id );
        }
      });
    });
  }
  decline( modal ) {
    modal.hide();
  }
  enrollInit() { this.purchase.emit(); }
}

