import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '@mahrio/shared';

@Component({
  selector: 'mahrio-dashboard-inventory',
  templateUrl: './dashboard-inventory.component.html',
  styleUrls: ['./dashboard-inventory.component.scss']
})
export class DashboardInventoryComponent implements OnInit {
  public loading = true;
  public transactions;
  public asset;
  constructor(private http: HttpClient, private session: SessionService) {
    this.asset = this.session.env['c']['asset'];
  }

  ngOnInit() {
    this.session.userSession.subscribe( token => {
      if ( token ) {
        const headers = new HttpHeaders({
          'Authorization': token
        });
        this.http.get('/api/v1/transactions', {headers: headers}).toPromise()
          .then( res => {
            this.loading = false;
            this.transactions = res['transactions'];
          });
      }
    });
  }

}
