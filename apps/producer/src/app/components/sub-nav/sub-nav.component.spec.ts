import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubNavComponent } from './sub-nav.component';
import { LocalStorageService } from 'ngx-localstorage';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('SubNavComponent', () => {
  let component: SubNavComponent;
  let fixture: ComponentFixture<SubNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LocalStorageService, useValue: {get: () => {}, remove: () => {}}}
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ SubNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
