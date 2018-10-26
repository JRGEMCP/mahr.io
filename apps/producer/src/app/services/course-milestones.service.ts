import { Injectable } from '@angular/core';
import { MilestoneSectionModel } from '@mahrio/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourseMilestonesService {
  private _sections;

  /**
   *  Milestones have several states now:
   *      Enabled/Disabled: Controls the ability to click on them, also displays them as spans or clickable links.
   *      Locked: Shows the lock icon, cannot be combined with Valid since the icon is tri-state now.
   *      Valid: Shows the check mark icon, cannot be combined with Locked since the milestone can have NO icon.
   *
   */
  constructor(private router: Router) {
    // New sections array
    this._sections = [];

    // State of the milestones now kept in here
    this.addSection('Planning')
      .activate()
      .expand()
      .add('EssentialFields', 'General Info')
      .add('TagsAndMetadata', 'Tags & Metadata');
    this.section('Planning')
      .milestone('EssentialFields')
      .active()
      .unchecked()
      .unlocked();

    this.addSection('Define')
      .activate()
      .expand()
      .add('Modules', 'Modules');

    this.addSection('Connect')
      .deactivate()
      .expand()
      .add('Articles', 'Articles');

    // this.addSection('Challenge')
    //   .deactivate()
    //   .contract()
    //   .add('Quiz', 'Quizzes');

    this.addSection('Deploy')
      .deactivate()
      .contract()
      .add('Publish', 'Publish');
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
    this.section('Planning')
      .activate()
      .expand();
    this.milestone('EssentialFields')
      .active()
      .unchecked()
      .unlocked();
    this.milestone('TagsAndMetadata').default();

    this.section('Define')
      .deactivate()
      .expand();
    this.milestone('Modules').default();

    this.section('Connect')
      .deactivate()
      .expand();

    this.milestone('Articles').default();

    // this.section('Challenge')
    //   .deactivate()
    //   .expand();
    // this.milestone('Quiz').default();

    this.section('Deploy')
      .deactivate()
      .expand();
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
      case 'initiatePlanning':
        // Planning active
        // Design active, submit for review active
        this.section('Planning')
          .activate()
          .expand();
        this.milestone('EssentialFields')
          .active()
          .unlocked();
        break;
      case 'completePlanning':
        // Planning checked
        // Design active, submit for review active
        this.section('Planning')
          .complete(true)
          .expand();
        this.section('Define')
          .activate()
          .expand();
        this.milestone('Modules')
          .active()
          .unchecked()
          .unlocked();
        break;
      // FIRST APPROVAL NEEDED
      case 'completeDefine':
        // Planning checked
        // Design active, submit for review active
        this.section('Planning')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Connect')
          .activate()
          .expand();
        this.milestone('Articles')
          .active()
          .unchecked()
          .unlocked();
        break;
      case 'completeConnect':
        this.section('Planning')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Connect')
          .complete(true)
          .expand();
        // this.section('Challenge')
        //   .activate()
        //   .expand();
        // this.milestone('Quiz')
        //   .active()
        //   .unchecked()
        //   .unlocked();
        this.section('Deploy')
          .activate()
          .expand();
        this.milestone('Publish')
          .active()
          .checked()
          .unlocked();
        break;
      case 'completeChallenge':
        this.section('Planning')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Connect')
          .complete(true)
          .expand();
        // this.section('Challenge')
        //   .complete(true)
        //   .expand();
        this.section('Deploy')
          .activate()
          .expand();
        this.milestone('Publish')
          .active()
          .checked()
          .unlocked();
        break;
      case 'completePublish':
        this.section('Planning')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Connect')
          .complete(true)
          .expand();
        // this.section('Challenge')
        //   .complete(true)
        //   .expand();
        this.section('Deploy')
          .complete(true)
          .expand();
        break;
      default:
        break;
    }
  }

  milestoneSelected($event, id) {
    console.log( $event, id, 'milestone');
    switch ($event) {
      case 'EssentialFields':
      case 'TagsAndMetadata':
        this.router.navigate(['/', 'courses', id, 'edit']);
        return 'edit';
      case 'Modules':
        this.router.navigate(['/', 'courses', id, 'define']);
        return 'define';
      case 'Articles':
        this.router.navigate(['/', 'courses', id, 'connect']);
        return 'connect';
      case 'Challenge':
        this.router.navigate(['/', 'courses', id, 'challenge']);
        return 'quizzes';
      case 'Publish':
        this.router.navigate(['/', 'courses', id, 'publish']);
        return 'publish';
    }
  }
}
