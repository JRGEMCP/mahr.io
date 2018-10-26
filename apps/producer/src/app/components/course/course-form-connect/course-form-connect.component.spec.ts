import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormConnectComponent } from './course-form-connect.component';

describe('CourseFormConnectComponent', () => {
  let component: CourseFormConnectComponent;
  let fixture: ComponentFixture<CourseFormConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
