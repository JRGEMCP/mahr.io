import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'm8io-milestone-panel',
  templateUrl: './milestone-panel.component.html',
  styleUrls: ['./milestone-panel.component.scss']
})
export class MilestonePanelComponent implements OnInit, OnChanges {
  @Input() state;
  @Input() milestoneService;
  @Output() onMilestoneSelected;
  @Output() onSectionToggled;

  constructor() {
    // Instantiate the event emitter
    this.onMilestoneSelected = new EventEmitter();
    this.onSectionToggled = new EventEmitter();
  }

  ngOnInit() {
    // Reset the milestone panel state every time the component is instantiated
    this.milestoneService.reset();
    this.milestoneService.tryParse(this.state);
  }

  ngOnChanges(changes) {
    this.milestoneService.tryParse(this.state);

    if (changes.state && !changes.state.isFirstChange()) {
      // try to parse it if passed as an input
      this.milestoneService.tryParse(this.state);
    }
  }

  get sections() {
    return this.milestoneService.sections;
  }

  selectMilestone($event) {
    // Trigger the selected event passing the name of the milestone
    this.onMilestoneSelected.emit($event);
  }

  sectionToggled($event) {
    // Trigger the  toggle event passing the name of the section
    this.onSectionToggled.emit($event);
  }
}
