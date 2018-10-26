import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule, TabsModule} from 'ngx-bootstrap';
import {SharedModule} from '@mahrio/shared';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {SubNavComponent} from '../../components/sub-nav/sub-nav.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, SubNavComponent ],
      imports: [
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
        SharedModule,
        RouterTestingModule,
        TabsModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
