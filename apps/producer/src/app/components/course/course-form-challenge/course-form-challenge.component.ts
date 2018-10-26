import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm8io-course-form-challenge',
  templateUrl: './course-form-challenge.component.html',
  styleUrls: ['./course-form-challenge.component.scss']
})
export class CourseFormChallengeComponent implements OnInit {
  @Input() course;
  constructor() { }

  ngOnInit() {
  }

}
