import { Component, OnInit } from '@angular/core';


import { SessionService} from "../../../services/session.service";
import {FormBuilder} from "@angular/forms";
import { Session } from "../../../models/session-modelo";

@Component({
  selector: 'm8io-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})

export class UpdatePasswordComponent {
  public password = '';
  public success;
  public user;
  public error;
  constructor(private session: SessionService, private formBuilder: FormBuilder) {
    this.user = new Session( this.formBuilder );
  }
  updatePassword() {
    this.session.updatePassword( {currentPassword: this.password, newPassword: this.user.password} )
      .then( res => {
        this.success = true;
      }, err => {
        this.error = err;
      });
  }
}
