import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'm8io-confirm-account',
  template: `<div class="p-5 text-center">
    Your Account is Confirmed
    <br/><br/>
    <button class="btn btn-link" (click)="close()" id="closeConfirmWindow">Close</button>
  </div>`
})
export class ConfirmAccountComponent {

  constructor(private active: BsModalRef) { }

  close() {
    this.active.hide();
  }
}

