import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'm8io-course-list-mine',
  templateUrl: './course-list-mine.component.html',
  styleUrls: ['./course-list-mine.component.scss']
})
export class CourseListMineComponent implements OnInit {
  @Input() entities;
  @Input() user;
  constructor() { }

  ngOnInit() {
  }

}
