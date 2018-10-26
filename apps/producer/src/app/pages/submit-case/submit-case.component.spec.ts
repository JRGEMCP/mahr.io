import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCaseComponent } from './submit-case.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('SubmitCaseComponent', () => {
  let component: SubmitCaseComponent;
  let fixture: ComponentFixture<SubmitCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCaseComponent ],
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
    fixture = TestBed.createComponent(SubmitCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
