import { Component, OnInit } from '@angular/core';
import { SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'm8io-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  public user;
  public show;
  public userReady;
  public eName;
  public isCollapsed = true;
  constructor(private session: SessionService, private router: Router) {
    this.eName = this.session.env['c']['asset'][0];
  }

  ngOnInit() {
    this.session.userProfile.subscribe( session => {
      this.user = session;
    });
    this.session.sessionReady.subscribe( res => {
      this.userReady = !!res;
    });
  }

  logout() {
    this.show = false;
    this.session.logout().then( () => this.router.navigate(['/tutorials']),
        err => this.router.navigate(['/tutorials']));
  }
}
