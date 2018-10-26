import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseMilestonesService } from '../../services/course-milestones.service';
import { FormBuilder} from "@angular/forms";
import { CourseService, CourseFormModel } from '@mahrio/shared';

@Component({
  selector: 'm8io-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  public entity;
  public state = 'initiatePlanning';
  constructor(public milestoneService: CourseMilestonesService,
              private formBuilder: FormBuilder,
              private entityService: CourseService,
              private router: Router) {
    this.entity = new CourseFormModel(this.formBuilder);
  }
  ngOnInit() {
  }
  save() {
    this.entityService.create( this.entity.course.value).then( res => {
      this.entity = new CourseFormModel(this.formBuilder, res['course']);
      this.router.navigate(['/', 'courses', this.entity.id, 'edit']);
    }, err => {
      console.log('ARTICLE ERROR');
    });
  }
}
