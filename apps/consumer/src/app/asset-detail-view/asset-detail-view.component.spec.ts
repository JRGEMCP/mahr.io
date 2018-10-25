import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailViewComponent } from './asset-detail-view.component';

describe('AssetDetailViewComponent', () => {
  let component: AssetDetailViewComponent;
  let fixture: ComponentFixture<AssetDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
