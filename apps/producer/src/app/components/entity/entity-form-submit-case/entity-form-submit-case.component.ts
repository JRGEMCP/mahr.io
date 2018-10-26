import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm8io-entity-form-submit-case',
  templateUrl: './entity-form-submit-case.component.html',
  styleUrls: []
})
export class EntityFormSubmitCaseComponent {
  @Input() entity;
  constructor() { }


}
