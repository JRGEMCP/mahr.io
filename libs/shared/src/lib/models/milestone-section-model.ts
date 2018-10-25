import { MilestoneModel } from './milestone-model';
import { SectionState } from './enums/section-state.enum';

export class MilestoneSectionModel {
  private _name;
  private _text;
  private _milestones;
  private _state;
  private _expanded;

  constructor(name, text) {
    // The name of the Section
    this._name = name || '';
    this._text = text || this._name; // Either passed as a param or same as name

    // The collection of milestones inside the Section
    this._milestones = [];

    // The state
    this._state = SectionState.INACTIVE;

    // The expanded/contracted state
    this._expanded = false;
  }

  // Getters and Setters
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }

  get milestones() {
    return this._milestones;
  }

  get state() {
    return this._state;
  }
  get isExpanded() {
    return this._expanded;
  }

  // Flags for the UI bindings
  get isActive() {
    return this._state === SectionState.ACTIVE;
  }
  get isComplete() {
    return this._state === SectionState.COMPLETE;
  }
  get isInactive() {
    return this._state === SectionState.INACTIVE;
  }

  // Change state methods
  activate() {
    this._state = SectionState.ACTIVE;
    return this; // Fluent
  }

  deactivate() {
    this._state = SectionState.INACTIVE;
    return this; // Fluent
  }

  complete(completeMilestones = false) {
    this._state = SectionState.COMPLETE;

    // If passed, set all milestones to done
    if (completeMilestones) {
      this.milestones.forEach(milestone => {
        milestone.done();
      });
    }

    return this; // Fluent
  }

  // Expand / Contract toggles
  expand() {
    this._expanded = true;
    return this; // Fluent
  }

  contract() {
    this._expanded = false;
    return this; // Fluent
  }

  toggle() {
    this._expanded = !this._expanded;
    return this; // Fluent
  }

  // Milestones methods
  milestone(name) {
    // Returns a MilestoneModel instance
    return this._milestones.filter(m => m.name === name)[0];
  }

  hasMilestone(name) {
    return this._milestones.some(m => m.name === name);
  }

  add(name, text) {
    // Milestone is an instance of MilestoneModel
    this._milestones.push(new MilestoneModel(name, text));
    return this; // Adding milestones is fluent too, can chain them together
  }

  // Shortcut Methods
  default() {
    // By default inactive and expanded
    this.deactivate().expand();
    // By default all milestones are inactive, unchecked, and locked
    this.milestones.forEach(milestone => {
      milestone.default();
    });
  }
}
