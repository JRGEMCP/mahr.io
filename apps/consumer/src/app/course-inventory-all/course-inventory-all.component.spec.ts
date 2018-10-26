import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInventoryAllComponent } from './course-inventory-all.component';

describe('CourseInventoryAllComponent', () => {
  let component: CourseInventoryAllComponent;
  let fixture: ComponentFixture<CourseInventoryAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInventoryAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInventoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
