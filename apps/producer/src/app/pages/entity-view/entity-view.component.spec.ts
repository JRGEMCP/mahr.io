import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityViewComponent } from './entity-view.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule, EntityModelo} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {EntityFormPreviewComponent} from '../../components/entity-form-preview/entity-form-preview.component';
import {MarkdownModule} from 'ngx-markdown';
import {AceEditorModule} from 'ng2-ace-editor';

describe('EntityViewComponent', () => {
  let component: EntityViewComponent;
  let fixture: ComponentFixture<EntityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityViewComponent,
        EntityFormPreviewComponent],
      imports: [
        PopoverModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule,
        MarkdownModule,
        AceEditorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityViewComponent);
    component = fixture.componentInstance;
    component.entity = new EntityModelo({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
