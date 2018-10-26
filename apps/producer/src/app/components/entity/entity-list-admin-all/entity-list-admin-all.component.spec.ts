import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListAdminAllComponent } from './entity-list-admin-all.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('EntityListAdminAllComponent', () => {
  let component: EntityListAdminAllComponent;
  let fixture: ComponentFixture<EntityListAdminAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListAdminAllComponent ],
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
    fixture = TestBed.createComponent(EntityListAdminAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
