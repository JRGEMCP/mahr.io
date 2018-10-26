import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import {PopoverModule} from "ngx-bootstrap";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserModule} from "@angular/platform-browser";
import {CourseFormModel, SharedModule} from "m8io-shared";
import {ActivatedRoute} from '@angular/router';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '123'}}}}
      ],
      declarations: [ CourseFormComponent ],
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
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    component.entity = new CourseFormModel(new FormBuilder());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
