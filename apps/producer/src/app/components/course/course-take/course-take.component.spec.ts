import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTakeComponent } from './course-take.component';

describe('CourseTakeComponent', () => {
  let component: CourseTakeComponent;
  let fixture: ComponentFixture<CourseTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
