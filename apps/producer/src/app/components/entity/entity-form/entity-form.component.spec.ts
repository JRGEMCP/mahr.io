import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormComponent } from './entity-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap';
import {SharedModule, EntityFormModelo} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

describe('EntityFormComponent', () => {
  let component: EntityFormComponent;
  let fixture: ComponentFixture<EntityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '123'}}}}
      ],
      declarations: [ EntityFormComponent ],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFormComponent);
    component = fixture.componentInstance;
    component.entity = new EntityFormModelo(new FormBuilder(), {})
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
