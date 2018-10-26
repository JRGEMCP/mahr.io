import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListComponent } from './entity-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CollapseModule, PopoverModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {EntityListAdminAllComponent} from '../../components/entity-list-admin-all/entity-list-admin-all.component';
import {EntityListMineComponent} from '../../components/entity-list-mine/entity-list-mine.component';
import {EntityListSubmittedComponent} from '../../components/entity-list-submitted/entity-list-submitted.component';
import {EntityListAllComponent} from '../../components/entity-list-all/entity-list-all.component';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';
import {EntityFilterComponent} from '../../components/entity-filter/entity-filter.component';

describe('EntityListComponent', () => {
  let component: EntityListComponent;
  let fixture: ComponentFixture<EntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListComponent,
        EntityListAdminAllComponent,
        EntityListMineComponent,
        EntityListSubmittedComponent,
        EntityListAllComponent,
        SubNavComponent,
        EntityFilterComponent],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule,
        CollapseModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
