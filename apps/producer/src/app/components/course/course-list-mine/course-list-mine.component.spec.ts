import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListMineComponent } from './course-list-mine.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('CourseListMineComponent', () => {
  let component: CourseListMineComponent;
  let fixture: ComponentFixture<CourseListMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListMineComponent ],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
