import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { SessionService} from "../../../services/session.service";
import { Session } from '../../../models/session-modelo';
import { BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'm8io-recover-password-update',
  templateUrl: './recover-password-update.component.html',
  styleUrls: ['./recover-password-update.component.css']
})
export class RecoverPasswordUpdateComponent implements OnInit {
  public user;
  @Input() token;
  public error;
  constructor(private formBuilder: FormBuilder, private session: SessionService, private active: BsModalRef) {

    this.user = new Session( this.formBuilder );
  }

  ngOnInit() {
  }
  changePassword() {
    this.session.changePassword( this.token, this.user.password).then( res => {
      this.active.hide();
    }, (error) => {
      this.error = error;
    });
  }


}

