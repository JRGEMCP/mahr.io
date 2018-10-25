import { Component, OnInit, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dxin-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChipComponent implements OnInit {
  @Input() selected;
  @Input() text;
  @Input() index;
  @Input() canDelete;

  @Output() chipRemoved;

  @HostBinding('class.primary') primary = this.selected === true;
  @HostBinding('class.info') info = this.selected !== true;

  constructor() {
    this.selected = false;
    this.text = '';
    this.index = 0;

    this.chipRemoved = new EventEmitter();
  }

  ngOnInit() {}

  removeChip() {
    this.chipRemoved.emit(this.index);
  }
}
