import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInventoryAllComponent } from './asset-inventory-all.component';

describe('AssetInventoryAllComponent', () => {
  let component: AssetInventoryAllComponent;
  let fixture: ComponentFixture<AssetInventoryAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInventoryAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetInventoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
