import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBreadcrumbComponent } from './course-breadcrumb.component';

describe('CourseBreadcrumbComponent', () => {
  let component: CourseBreadcrumbComponent;
  let fixture: ComponentFixture<CourseBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
