import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypeaheadComponent } from './entity-typeahead.component';

describe('EntityTypeaheadComponent', () => {
  let component: EntityTypeaheadComponent;
  let fixture: ComponentFixture<EntityTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
