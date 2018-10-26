import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormSectionsComponent } from './entity-form-sections.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule, TabsModule} from 'ngx-bootstrap';
import {SharedModule, EntityFormModelo} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {QuillModule} from 'ngx-quill';
import {MarkdownModule} from 'ngx-markdown';
import {ActivatedRoute} from '@angular/router';

describe('EntityFormSectionsComponent', () => {
  let component: EntityFormSectionsComponent;
  let fixture: ComponentFixture<EntityFormSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '123'}}}}
      ],
      declarations: [ EntityFormSectionsComponent ],
      imports: [
        PopoverModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        QuillModule,
        MarkdownModule,
        TabsModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFormSectionsComponent);
    component = fixture.componentInstance;
    component.entity = new EntityFormModelo(new FormBuilder(), {})
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
