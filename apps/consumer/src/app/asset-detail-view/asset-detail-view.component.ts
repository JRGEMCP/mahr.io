import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { SessionService} from '@mahrio/shared';

@Component({
  selector: 'mahrio-asset-detail-view',
  templateUrl: './asset-detail-view.component.html',
  styleUrls: ['./asset-detail-view.component.scss']
})
export class AssetDetailViewComponent implements OnInit, OnDestroy {
  @Input() entity;
  private _subs;
  public user;
  constructor(private session: SessionService) { }

  ngOnInit() {
    this._subs = this.session.userProfile.subscribe( profile => {
      this.user = profile;
    });
  }
  ngOnDestroy(){
    this._subs.unsubscribe();
  }
}
