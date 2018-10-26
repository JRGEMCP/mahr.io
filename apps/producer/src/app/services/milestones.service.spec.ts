import { TestBed, inject } from '@angular/core/testing';

import { MilestonesService } from './milestones.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('MilestonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MilestonesService],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([MilestonesService], (service: MilestonesService) => {
    expect(service).toBeTruthy();
  }));
});
