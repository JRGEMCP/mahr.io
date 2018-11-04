import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { EntityService, PagerService} from '@mahrio/shared';
import { ActivatedRoute } from "@angular/router";
import { SessionService, FilterService, UserCreated, NoFilter,
  SubmitDesignFilter, SubmitSectionsFilter, SubmitCodeFilter, PublishedFilter } from '@mahrio/shared';
@Component({
  selector: 'mahrio-dashboard-inventory',
  templateUrl: './dashboard-inventory.component.html',
  styleUrls: ['./dashboard-inventory.component.scss']
})
export class DashboardInventoryComponent implements OnInit {
  public loading = true;
  public transactions;
  public asset;
  public user;
  private _readyEntities;
  private _readySession;
  constructor(private http: HttpClient,
              private session: SessionService,
              private entity: EntityService,
              public pager: PagerService,
              private route: ActivatedRoute,
              private filtered: FilterService) {
    this.asset = this.session.env['c']['asset'];
    this.pager.items = [];
  }

  ngOnInit() {
    this.session.userProfile.subscribe( profile => {
      this.user = profile;
      this.setFilters( null );
    });
    this.session.userSession.subscribe( token => {
      if ( token ) {
        const headers = new HttpHeaders({
          'Authorization': token
        });
        this.http.get('/api/v1/transactions', {headers: headers}).toPromise()
          .then( res => {
            this.loading = false;
            this.transactions = res['transactions'];
            console.log( this.transactions );
          });
      }
    });
    this._readySession = true;
    this.entity.list({}).then( ents => {
      this.filtered.entities = ents[ this.entity.type[0].toLowerCase() ];
      this.setFilters( 'none' );
    });
  }
  setFilters( view ) {
    if( this.user ) {
      this.filtered.filters = [ new UserCreated(this.user.id) ];
    }
    if( this.user && view ) {
      this._loadList();
    }
  }

  _loadList() {
    this.pager.items = this.filtered.filterEntities().slice(0, 5);
    this.pager.setPage(0);
    this._readyEntities = true;
  }

  get ready() { return this._readyEntities && this._readySession; }

}
