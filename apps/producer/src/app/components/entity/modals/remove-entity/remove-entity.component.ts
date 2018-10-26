import {Component, Input, OnInit} from '@angular/core';
import {EntityService} from '@mahrio/shared';
import { BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'm8io-remove-entity',
  templateUrl: './remove-entity.component.html',
  styleUrls: ['./remove-entity.component.scss']
})
export class RemoveEntityComponent implements OnInit {
  @Input() name;
  @Input() artId;
  @Input() secId;
  constructor(private entityService: EntityService, private mRef: BsModalRef) { }

  ngOnInit() {
  }
  confirm() {
    this.entityService.removeSection( this.artId, this.secId).then( () => {
      this.mRef.hide();
    });
  }
  decline() {
    this.mRef.hide();
  }

}
