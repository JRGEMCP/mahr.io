import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInventoryComponent } from './course-inventory.component';

describe('CourseInventoryComponent', () => {
  let component: CourseInventoryComponent;
  let fixture: ComponentFixture<CourseInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
