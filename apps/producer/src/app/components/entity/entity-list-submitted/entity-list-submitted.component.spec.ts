import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListSubmittedComponent } from './entity-list-submitted.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('EntityListSubmittedComponent', () => {
  let component: EntityListSubmittedComponent;
  let fixture: ComponentFixture<EntityListSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListSubmittedComponent ],
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
    fixture = TestBed.createComponent(EntityListSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
