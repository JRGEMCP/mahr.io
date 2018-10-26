import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormPreviewComponent } from './entity-form-preview.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule, EntityModelo} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {AceEditorModule} from 'ng2-ace-editor';
import {MarkdownModule} from 'ngx-markdown';

describe('EntityFormPreviewComponent', () => {
  let component: EntityFormPreviewComponent;
  let fixture: ComponentFixture<EntityFormPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFormPreviewComponent ],
      imports: [
        PopoverModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        AceEditorModule,
        MarkdownModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFormPreviewComponent);
    component = fixture.componentInstance;
    component.entity = new EntityModelo({})
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
