import {Component, OnDestroy, OnInit} from '@angular/core';
import { EntityService} from '@mahrio/shared';
import { ActivatedRoute} from "@angular/router";
import { interval } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '@mahrio/shared';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css']
})
export class EntityViewComponent implements OnInit, OnDestroy {
  public entity;
  private link;
  private _subs;
  private _token;
  constructor(private entityService: EntityService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private session: SessionService) {
    this.entity = this.entityService.cachedEntity;
    this.link = this.route.snapshot.params.link;

    const source = interval(60000);
    this._subs = source.subscribe(val => {
      this.logged();
    });
    this.session.userSession.subscribe( sess => {
      this._token = sess;
      if ( sess ) {
        this.logged();
      }
    });
  }
  logged() {
    this.http.post('/api/v1/logs', {log: {action: 'view', path: this.link}}, this.getHeaders(this._token)).toPromise().then( () => {
      console.log('logged');
    });
  }
  getHeaders( token ) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if ( token ) {
      headers['Authorization'] = token;
    }
    return {
      headers: new HttpHeaders(headers)
    };
  }

  ngOnInit() {
    if (!this.entity ) {
      this.entityService.list({link: this.link}).then( res => {
        this.entity = res[ this.entityService.type[0].toLowerCase() ];
      });
    }

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }


}
