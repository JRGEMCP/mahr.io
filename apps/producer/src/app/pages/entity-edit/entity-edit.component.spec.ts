import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditComponent } from './entity-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CollapseModule, PopoverModule, TabsModule} from 'ngx-bootstrap';
import {SharedModule, EntityFormModelo} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {EntityFormComponent} from '../../components/entity-form/entity-form.component';
import {EntityFormSectionsComponent} from '../../components/entity-form-sections/entity-form-sections.component';
import {EntityFormDesignScenarioComponent} from '../../components/entity-form-design-scenario/entity-form-design-scenario.component';
import {EntityFormCodeComponent} from '../../components/entity-form-code/entity-form-code.component';
import {EntityFormPreviewComponent} from '../../components/entity-form-preview/entity-form-preview.component';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';
import {MarkdownModule} from 'ngx-markdown';
import {QuillModule} from 'ngx-quill';
import {AceEditorModule} from 'ng2-ace-editor';

describe('EntityEditComponent', () => {
  let component: EntityEditComponent;
  let fixture: ComponentFixture<EntityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditComponent,
        EntityFormComponent,
        EntityFormSectionsComponent,
        EntityFormDesignScenarioComponent,
        EntityFormCodeComponent,
        EntityFormPreviewComponent,
        SubNavComponent
      ],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule,
        CollapseModule.forRoot(),
        MarkdownModule,
        QuillModule,
        TabsModule.forRoot(),
        AceEditorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
