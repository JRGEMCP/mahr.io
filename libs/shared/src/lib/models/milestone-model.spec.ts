import { MilestoneModel } from './milestone-model';

describe('MilestoneModel', () => {
  it('should create an instance', () => {
    expect(new MilestoneModel('', '')).toBeTruthy();
  });
});
