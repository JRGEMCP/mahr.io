import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '@mahrio/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  public loading = true;
  public transactions;
  constructor(private http: HttpClient, private session: SessionService) { }

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
