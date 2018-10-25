import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordUpdateComponent } from './recover-password-update.component';

describe('RecoverPasswordUpdateComponent', () => {
  let component: RecoverPasswordUpdateComponent;
  let fixture: ComponentFixture<RecoverPasswordUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPasswordUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
