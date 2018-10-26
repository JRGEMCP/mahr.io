import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailEnrolledComponent } from './course-detail-enrolled.component';

describe('CourseDetailEnrolledComponent', () => {
  let component: CourseDetailEnrolledComponent;
  let fixture: ComponentFixture<CourseDetailEnrolledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailEnrolledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
