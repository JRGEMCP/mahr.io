import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'm8io-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MilestoneListComponent {
  @Input() section;
  @Output() onToggled;

  constructor() {
    // Instantiate the event emitter
    this.onToggled = new EventEmitter();
  }

  toggle() {
    // Toggle
    this.section.toggle();
    // Trigger the  toggle event passing the name of the section
    this.onToggled.emit(this.section.name);
  }
}
