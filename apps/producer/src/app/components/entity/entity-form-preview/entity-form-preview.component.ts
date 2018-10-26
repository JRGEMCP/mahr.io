import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { SessionService} from '@mahrio/shared';

@Component({
  selector: 'm8io-entity-form-preview',
  templateUrl: './entity-form-preview.component.html',
  styleUrls: ['./entity-form-preview.component.scss']
})
export class EntityFormPreviewComponent implements OnInit, OnDestroy {
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
