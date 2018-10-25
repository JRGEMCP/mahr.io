import { TestBed, inject } from '@angular/core/testing';

import { PagerService } from './pager.service';

describe('PagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagerService]
    });
  });

  it('should be created', inject([PagerService], (service: PagerService) => {
    expect(service).toBeTruthy();
  }));
  it( 'should have 1 page when 3 items at a default size of 10', inject([PagerService], (service: PagerService) => {
    service.items =  [1, 2, 3];
    expect(service.pages).toBe(1);
  }));
  it( 'should change size to 1 and have 3 pages', inject([PagerService], (service: PagerService) => {
    service.items = [1, 2, 3];
    service.size = 1;
    expect(service.pages).toBe(3);
  }));
  it( 'should have prev page at index 2', inject([PagerService], (service: PagerService) => {
    service.items = [1, 2, 3];
    service.size = 1;
    service.setPage(2);
    expect(service.hasPrev).toEqual(true);
  }));
  it( `should have prev and next page at page 2`, inject([PagerService], (service: PagerService) => {
    service.items = [1, 2, 3, 4, 5];
    service.size = 1;
    service.setPage(2);
    expect(service.hasPrev).toEqual(true);
    expect(service.hasNext).toEqual(true);
  }));
  it( `should have last`, inject([PagerService], (service: PagerService) => {
    service.items = [1, 2, 3, 4, 5];
    service.size = 1;
    service.last();
    expect(service.isLast).toEqual(true);
    expect(service.isPage(4)).toEqual(true);
  }));
  it( `should have `, inject([PagerService], (service: PagerService) => {
    service.items = [1, 2, 3, 4, 5];
    service.size = 1;
    service.last();
    service.prev();
    expect(service.index).toEqual(3);
  }));
  it( 'should have page size to 10', inject([PagerService], (service: PagerService) => {
    expect(service.size).toBe(10);
  }));
});
