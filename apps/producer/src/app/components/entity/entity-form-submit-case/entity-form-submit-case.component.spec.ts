import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormSubmitCaseComponent } from './entity-form-submit-case.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {MarkdownModule} from 'ngx-markdown';

describe('EntityFormSubmitCaseComponent', () => {
  let component: EntityFormSubmitCaseComponent;
  let fixture: ComponentFixture<EntityFormSubmitCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFormSubmitCaseComponent ],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        MarkdownModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFormSubmitCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
