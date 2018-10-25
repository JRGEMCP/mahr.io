import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonePanelComponent } from './milestone-panel.component';
import { MilestoneComponent } from '../milestone/milestone.component';
import { MilestoneListComponent } from '../milestone-list/milestone-list.component';
import { MilestoneService } from '../../../shared/services/milestone.service';
import { MilestoneStreamService } from '../../../shared/services/milestone-stream.service';

describe('MilestonePanelComponent', () => {
  let component: MilestonePanelComponent;
  let fixture: ComponentFixture<MilestonePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneComponent, MilestoneListComponent, MilestonePanelComponent],
      providers: [MilestoneService, MilestoneStreamService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
