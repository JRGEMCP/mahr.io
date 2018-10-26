import { TestBed, inject } from '@angular/core/testing';

import { CourseMilestonesService } from './course-milestones.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('CourseMilestonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseMilestonesService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([CourseMilestonesService], (service: CourseMilestonesService) => {
    expect(service).toBeTruthy();
  }));
});
