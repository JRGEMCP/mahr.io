import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionService, RecoverPasswordUpdateComponent, ConfirmAccountComponent } from '@mahrio/shared';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as env from '../environments/environment';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'mahrio-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private mRef;
  constructor( private session: SessionService,
               private route: ActivatedRoute,
               private modal: BsModalService) {
    this.session.registerEnvironment( 'c', env.environment );

    this.route.queryParams
      .subscribe(params => {
        if ( params.token ) {
          this.session.isValidToken( params.token ).then( () => {
            this.mRef = this.modal.show( RecoverPasswordUpdateComponent, {initialState: {
              token: params.token
              }});
          }, () => {
            // clear token
          });
        } else if (params.confirm ) {
          this.session.confirmAccount(params.confirm).then( () => {
            this.mRef = this.modal.show( ConfirmAccountComponent );
          }, err => {
            console.log('no valid confirm');
          });
        } else if ( params.course ) {
          this.session.course = {id: params.course};
        } else if ( params.purchase ) {
          this.session.purchase = true;
        }
      });
  }
  ngOnInit() {

  }
}
