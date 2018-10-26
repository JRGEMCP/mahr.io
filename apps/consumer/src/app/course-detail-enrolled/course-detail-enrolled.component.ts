import { Component, OnInit, Input } from '@angular/core';
import { CourseMilestonesModel } from '@mahrio/shared';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'mahrio-course-detail-enrolled',
  templateUrl: './course-detail-enrolled.component.html',
  styleUrls: ['./course-detail-enrolled.component.scss']
})
export class CourseDetailEnrolledComponent implements OnInit {
  @Input() course;
  public section;
  public milestones;
  public sectionBody = '';
  constructor(private route: ActivatedRoute, private router: Router) {
    this.section = this.route.snapshot.params.section;
  }

  ngOnInit() {
    this.milestones = new CourseMilestonesModel(this.router, this.course.link, this.course.modules);
    if ( this.section ) {
      this.sectionBody = this.findSection( this.section ).data.body;

    }
  }

  findSection( secId ) {
    let sec;
    this.course.modules.map( m => {
      m.content.map( c => {
        if (c.id === secId ) {
          sec = c;
        }
      });
    });
    return sec;
  }
  handleClick( $event ) {
    this.sectionBody = this.findSection( $event ).data.body;
    this.section = $event;
    this.milestones.milestoneSelected($event);
  }

}
