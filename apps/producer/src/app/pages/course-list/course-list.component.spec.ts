import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CollapseModule, PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {CourseListMineComponent} from '../../components/course-list-mine/course-list-mine.component';
import {CourseListAllComponent} from '../../components/course-list-all/course-list-all.component';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';
import {EntityFilterComponent} from '../../components/entity-filter/entity-filter.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListComponent,
        CourseListMineComponent,
        CourseListAllComponent,
        SubNavComponent,
        EntityFilterComponent],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule,
        CollapseModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
