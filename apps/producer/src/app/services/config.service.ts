import { Injectable } from '@angular/core';
import { EnvService, MilestoneSectionModel } from '@mahrio/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _sections;
  private entity;

  /**
   *  Milestones have several states now:
   *      Enabled/Disabled: Controls the ability to click on them, also displays them as spans or clickable links.
   *      Locked: Shows the lock icon, cannot be combined with Valid since the icon is tri-state now.
   *      Valid: Shows the check mark icon, cannot be combined with Locked since the milestone can have NO icon.
   *
   */
  constructor(private router: Router, private env: EnvService) {
    // New sections array
    this._sections = [];
    this.entity = this.env.entity[1].toLowerCase();

    // State of the milestones now kept in here
    this.addSection('Planning')
      .deactivate()
      .expand()
      .add('EssentialFields', 'General Info')
      .add('Tags', 'Tags');
    this.addSection('Define').add('SetSections', 'Sections').add('SubmitSections', 'Submit');
    this.addSection('Review').add('Reviewer', 'Reviewer');
    this.addSection('Deploy').add('Publish', 'Publish');
  }

  get sections() {
    return this._sections;
  }

  addSection(name, text?) {
    this._sections.push(new MilestoneSectionModel(name, text));
    return this.section(name); // Not fluent, but allows to set the section state and add milestones right away
  }

  section(name) {
    // Returns a SectionModel
    return this.sections.filter(s => s.name === name)[0];
  }

  milestone(name) {
    // Loop through the sections to find the first milestone with that unique name
    return this.sections.filter(s => s.hasMilestone(name))[0].milestone(name);
  }

  reset() {
    this.section('Planning').activate().expand();
    this.milestone('EssentialFields').active().unchecked();
    // this.milestone('Tags').active().unchecked();

    this.section('Define').deactivate().expand();
    this.milestone('SetSections').default();
    this.milestone('SubmitSections').default();

    this.section('Review').deactivate().expand();
    this.milestone('Reviewer').default();

    this.section('Deploy').deactivate().expand();
    this.milestone('Publish').default();
  }

  /*
   * Tries to parse the current state of the milestone panel based on the state of the version object passed
   */
  tryParse( state ) {
    // Set all sections to default values
    this.sections.forEach(section => {
      section.default();
    });

    // Then change only what needs changing depending on statusCode of version
    switch ( state ) {
      case 'locked':
        break;
      case 'initiatePlanning':  // ANYONE
        this.section('Planning').activate().expand();
        this.milestone('EssentialFields').active().unlocked();
        break;
      case 'advancePlanning':  // ANYONE
        this.section('Planning').activate().expand();
        this.milestone('EssentialFields').active().unlocked();
        this.milestone('Tags').active().unlocked();
        break;
      case 'completePlanning':  // CREATOR
        this.section('Planning').complete(true).expand();
        this.section('Define').activate().expand();
        this.milestone('SetSections').active().unchecked().unlocked();
        break;
      case 'setSections':       // TEAM
        this.section('Planning').complete(true).expand();
        this.section('Define').activate().expand();
        this.milestone('SetSections').active().checked().unlocked();
        this.milestone('SubmitSections').active().unchecked().unlocked();
        break;
      case 'submitSections':    // CREATOR
        this.section('Planning').complete(true).expand();
        this.section('Define').activate().expand();
        this.milestone('SetSections').active().checked().unlocked();
        this.milestone('SubmitSections').active().checked().unlocked();
        break;

      // APPROVAL NEEDED        // REVIEWER
      case 'reviewer':
        this.section('Planning').complete(true).expand();
        this.section('Define').complete(true).expand();
        this.section('Review').activate().expand();
        this.milestone('Reviewer')
          .active()
          .unchecked()
          .unlocked();
        break;
      case 'completeDefine':
        this.section('Planning').complete(true).expand();
        this.section('Define').complete(true).expand();
        this.section('Review').complete(true).expand();
        this.milestone('Publish')
          .active()
          .unchecked()
          .unlocked();
        break;
    case 'completePublish':     // CREATOR
        this.section('Planning')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Review')
          .complete(true)
          .expand();
        this.section('Deploy')
          .complete(true)
          .expand();
        break;
      default:
        break;
    }
  }

  milestoneSelected($event, id) {
    switch ($event) {
      case 'EssentialFields':
        this.router.navigate(['/', this.entity, id, 'edit']);
        return 'edit';
      case 'Tags':
        this.router.navigate(['/', this.entity, id, 'edit']);
        return 'edit';
      case 'SetSections':
        this.router.navigate(['/', this.entity, id, 'define']);
        return 'define';
      case 'SubmitSections':
        this.router.navigate(['/', this.entity, id, 'submit-sections']);
        return 'submit-sections';
      case 'Reviewer':
        this.router.navigate(['/', this.entity, id, 'dx', 'review']);
        return 'design';
      case 'Publish':
        this.router.navigate(['/', this.entity, id, 'publish']);
        return 'publish';
    }
  }
}
