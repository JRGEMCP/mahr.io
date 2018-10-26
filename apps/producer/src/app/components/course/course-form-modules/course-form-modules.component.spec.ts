import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormModulesComponent } from './course-form-modules.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {CourseFormModel, SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';

describe('CourseFormModulesComponent', () => {
  let component: CourseFormModulesComponent;
  let fixture: ComponentFixture<CourseFormModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormModulesComponent ],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormModulesComponent);
    component = fixture.componentInstance;
    component.entity = new CourseFormModel(new FormBuilder());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
