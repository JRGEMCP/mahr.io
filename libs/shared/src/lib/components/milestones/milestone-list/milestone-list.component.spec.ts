import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneListComponent } from './milestone-list.component';

describe('MilestoneListComponent', () => {
  let component: MilestoneListComponent;
  let fixture: ComponentFixture<MilestoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneListComponent);
    component = fixture.componentInstance;

    component.section = { isActive: true, isComplete: true };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
