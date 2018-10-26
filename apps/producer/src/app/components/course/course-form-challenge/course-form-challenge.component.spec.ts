import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormChallengeComponent } from './course-form-challenge.component';

describe('CourseFormChallengeComponent', () => {
  let component: CourseFormChallengeComponent;
  let fixture: ComponentFixture<CourseFormChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
