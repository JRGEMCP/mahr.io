import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCreateComponent } from './entity-create.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {EntityFormComponent} from '../../components/entity-form/entity-form.component';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';

describe('EntityCreateComponent', () => {
  let component: EntityCreateComponent;
  let fixture: ComponentFixture<EntityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityCreateComponent,
        EntityFormComponent,
        SubNavComponent],
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
    fixture = TestBed.createComponent(EntityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
