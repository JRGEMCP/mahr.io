import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'm8io-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {
  @Input() milestone;
  @Output() onSelect;

  constructor() {
    // And instantiate the emitters
    this.onSelect = new EventEmitter();
  }

  ngOnInit() {}

  click(event) {
    event.preventDefault();

    this.onSelect.emit(this.milestone.name);
  }
}
