import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditComponent } from './course-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {CourseFormModulesComponent} from '../../components/course-form-modules/course-form-modules.component';
import {EntityFormPreviewComponent} from '../../components/entity-form-preview/entity-form-preview.component';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';
import {CourseFormComponent} from '../../components/course-form/course-form.component';
import {MarkdownModule} from 'ngx-markdown';
import {AceEditorModule} from 'ng2-ace-editor';
import {QuillModule} from 'ngx-quill';

describe('CourseEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditComponent,
        CourseFormComponent,
        CourseFormModulesComponent,
        EntityFormPreviewComponent,
        SubNavComponent],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule,
        MarkdownModule,
        AceEditorModule,
        QuillModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
