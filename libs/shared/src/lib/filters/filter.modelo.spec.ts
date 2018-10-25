import { FilterModelo } from './filter.modelo';

describe('FilterModelo', () => {
  it('should create an instance', () => {
    expect(new FilterModelo('','', () => {})).toBeTruthy();
  });
});
