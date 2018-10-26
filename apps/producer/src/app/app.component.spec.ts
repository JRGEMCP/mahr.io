import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {PopoverModule} from "ngx-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "m8io-shared";
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
