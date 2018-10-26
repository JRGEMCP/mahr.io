import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListAllComponent } from './entity-list-all.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('EntityListAllComponent', () => {
  let component: EntityListAllComponent;
  let fixture: ComponentFixture<EntityListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListAllComponent ],
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
    fixture = TestBed.createComponent(EntityListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
