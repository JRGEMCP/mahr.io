import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListMineComponent } from './entity-list-mine.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('EntityListMineComponent', () => {
  let component: EntityListMineComponent;
  let fixture: ComponentFixture<EntityListMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListMineComponent ],
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
    fixture = TestBed.createComponent(EntityListMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
