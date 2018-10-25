import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ValidSessionGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.promisedSession().then( res => {
      if ( res ) {
        return true;
      } else {
        this.router.navigate(['/session', 'new' ]);
        return false;
      }
    });
  }

  promisedSession() {
    return new Promise((res, rej) => {
      this.session.sessionReady.subscribe( s => {
        if (s) {
          return res( !!this.session.userSession.getValue() );
        }
      });
    });
  }
}
