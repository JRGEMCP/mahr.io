import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListAllComponent } from './course-list-all.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('CourseListAllComponent', () => {
  let component: CourseListAllComponent;
  let fixture: ComponentFixture<CourseListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListAllComponent ],
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
    fixture = TestBed.createComponent(CourseListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
