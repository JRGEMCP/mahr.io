import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormPreviewComponent } from './course-form-preview.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';

describe('CourseFormPreviewComponent', () => {
  let component: CourseFormPreviewComponent;
  let fixture: ComponentFixture<CourseFormPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormPreviewComponent ],
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
    fixture = TestBed.createComponent(CourseFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
