import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateComponent } from './course-create.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {CourseFormComponent} from '../../components/course-form/course-form.component';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';

describe('CourseCreateComponent', () => {
  let component: CourseCreateComponent;
  let fixture: ComponentFixture<CourseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCreateComponent,
        CourseFormComponent,
        SubNavComponent],
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
    fixture = TestBed.createComponent(CourseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
