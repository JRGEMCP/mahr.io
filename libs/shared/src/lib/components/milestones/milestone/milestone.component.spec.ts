import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneComponent } from './milestone.component';

describe('MilestoneComponent', () => {
  let component: MilestoneComponent;
  let fixture: ComponentFixture<MilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneComponent);
    component = fixture.componentInstance;
    component.milestone = { isActive: true };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
