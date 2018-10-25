import { Component } from '@angular/core';
import {FormBuilder, Validators } from "@angular/forms";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'm8io-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  public user;
  public success;
  public testingToken;
  constructor(private formBuilder: FormBuilder, private session: SessionService) {
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }

  recoverPassword() {
    this.session.recoverPassword(this.user.value.email).then( (res) => {
      this.success = true;
      this.testingToken = res['token'];
    });
  }
}
