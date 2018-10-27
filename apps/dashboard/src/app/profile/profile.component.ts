import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionService, UserService } from '@mahrio/shared';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public user;
  public u;
  constructor(private session: SessionService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.u = new Session( this.formBuilder );

  }

  ngOnInit() {
    this.session.userProfile.subscribe( user => {
      this.user = user;
    });
  }

  get emailsEqual() {
    return this.user && this.user.email === this.u.form.value.email;
  }
  removeAccount() {
    this.userService.removeSelf().then( res => {
      this.session.logout().then( () => this.router.navigate(['/tutorials']),
        err => this.router.navigate(['/tutorials']));
    });
  }

}
