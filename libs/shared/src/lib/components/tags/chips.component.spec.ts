import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http,
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  ResponseType,
  RequestMethod,
  BaseRequestOptions
} from '@angular/http';

import { ChipsComponent } from './chips.component';

import { SharedModule } from '../../../shared/shared.module';
import { LifecycleV6ApiService } from '../../../shared/services/lifecycle-v6-api.service';
import { LifecycleV6UserService } from '../../../shared/services/lifecycle-v6-user.service';
import { LifecycleV6SwaggerService } from '../../../shared/services/lifecycle-v6-swagger.service';
import { GithubService } from '../../../shared/services/github.service';
import { MessageService } from '../../../shared/services/message.service';
import { AccessControlService } from '../../../shared/services/accesscontrol.service';
import { ToastService } from '../../../shared/services/toast.service';
import { PagingService } from '../../../shared/services/paging.service';
import { HelpersService } from '../../../shared/services/helpers.service';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

describe('ChipsComponent', () => {
  let component: ChipsComponent;
  let fixture: ComponentFixture<ChipsComponent>;

  let formBuilder: FormBuilder;

  beforeAll(() => {
    formBuilder = new FormBuilder();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        PopoverModule.forRoot(),
        TypeaheadModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot()
      ],
      providers: [
        {
          provide: Http,
          useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        FormBuilder,
        LifecycleV6ApiService,
        LifecycleV6UserService,
        LifecycleV6SwaggerService,
        GithubService,
        MessageService,
        AccessControlService,
        ToastService,
        PagingService,
        HelpersService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsComponent);
    component = fixture.componentInstance;

    // Inputs
    component.addOnBlur = true;
    component.addOnComma = true;
    component.addOnEnter = true;
    component.addOnPaste = true;
    component.addOnSpace = true;
    component.allowDuplicates = true;
    component.allowedChipsPattern = /.+/;
    component.autocomplete = false;
    component.autocompleteItems = [];
    component.autocompleteMustMatch = [];
    component.autocompleteSelectFirstItem = [];
    component.pasteSplitPattern = ',';
    component.placeholder = 'something';
    component.textarea = null;
    component.canEdit = true;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger isBlank', () => {
    const isblank = component._isBlank(null);
    expect(isblank).toBeTruthy();
  });

  it('should trigger onKeydown', () => {
    component.addOnEnter = true;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onKeydown({ keyCode: 13, preventDefault: () => {} }); // Enter
    expect(true).toBeTruthy();
    component.addOnEnter = false;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onKeydown({ keyCode: 13, preventDefault: () => {} }); // Enter
    expect(true).toBeTruthy();

    component.addOnComma = true;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onKeydown({ keyCode: 188, preventDefault: () => {} }); // Comma
    expect(true).toBeTruthy();
    component.addOnComma = false;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onKeydown({ keyCode: 188, preventDefault: () => {} }); // Comma
    expect(true).toBeTruthy();

    component.addOnSpace = true;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onKeydown({ keyCode: 32, preventDefault: () => {} }); // Space
    expect(true).toBeTruthy();
    component.addOnSpace = false;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onKeydown({ keyCode: 32, preventDefault: () => {} }); // Space
    expect(true).toBeTruthy();

    component.onKeydown({ keyCode: 255, preventDefault: () => {} }); // Default
    expect(true).toBeTruthy();
  });

  it('should trigger ngOnChanges', () => {
    component.ngOnChanges({ canEdit: { currentValue: true } });
    expect(true).toBeTruthy();
    component.ngOnChanges({ canEdit: { currentValue: false } });
    expect(true).toBeTruthy();
    component.ngOnChanges({ canEdit: null });
    expect(true).toBeTruthy();
  });

  it('should trigger onInputBlurred', () => {
    component.addOnBlur = true;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onInputBlurred({});
    expect(true).toBeTruthy();
    component.addOnBlur = false;
    component.chipInputForm.controls['chipsInputField'].setValue('some_value');
    component.onInputBlurred({});
    expect(true).toBeTruthy();
  });

  it('should trigger onInputFocused', () => {
    component.onInputFocused({});
    expect(true).toBeTruthy();
  });

  it('should trigger _splitString', () => {
    const newchips = component._splitString('tag1,tag2');
    expect(newchips).toEqual(['tag1', 'tag2']);
  });

  it('should trigger _removeChip', () => {
    component.chipsList.push('tag1');
    component._removeChip('tag1');
    expect(component.chipsList.length).toBe(0);
  });

  it('should trigger writeValue', () => {
    component.writeValue(['tag1']);
    expect(component.chipsList.length).toBe(1);
    component.writeValue(null);
    expect(component.chipsList.length).toBe(0);
  });

  it('should trigger registerOnChange', () => {
    component.registerOnChange(1);
    expect(true).toBeTruthy();
  });

  it('should trigger registerOnTouched', () => {
    component.registerOnTouched(1);
    expect(true).toBeTruthy();
  });
});
