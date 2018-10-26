import { Injectable } from '@angular/core';
import { MilestoneSectionModel } from '@mahrio/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MilestonesService {
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
    this.addSection('Discover')
      .activate()
      .expand()
      .add('EssentialFields', 'General Info')
      .add('TeamsAndOwners', 'Ownership')
      .add('TagsAndMetadata', 'Tags & Metadata');
    this.section('Discover')
      .milestone('EssentialFields')
      .active()
      .unchecked()
      .unlocked();

    this.addSection('Define')
      .activate()
      .expand()
      .add('UseCases', 'Use Cases')
      .add('SubmitCase', 'Submit Case');

    this.addSection('Design')
      .deactivate()
      .expand()
      .add('UseCaseScenario', 'Use Case Scenario')
      .add('SubmitDesign', 'Submit Design');

    this.addSection('Engineer')
      .deactivate()
      .contract()
      .add('SourceCode', 'Source Code');

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
    this.section('Discover')
      .activate()
      .expand();
    this.milestone('EssentialFields')
      .active()
      .unchecked()
      .unlocked();
    this.milestone('TeamsAndOwners').default();
    this.milestone('TagsAndMetadata').default();

    this.section('Define')
      .deactivate()
      .expand();
    this.milestone('UseCases').default();
    this.milestone('SubmitCase').default();

    this.section('Design')
      .deactivate()
      .expand();

    this.milestone('UseCaseScenario').default();
    this.milestone('SubmitDesign').default();

    this.section('Engineer')
      .deactivate()
      .expand();
    this.milestone('SourceCode').default();

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
        this.section('Discover')
          .activate()
          .expand();
        this.milestone('EssentialFields')
          .active()
          .unlocked();
        break;
      case 'completePlanning':
        // Planning checked
        // Design active, submit for review active
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .activate()
          .expand();
        this.milestone('UseCases')
          .active()
          .unchecked()
          .unlocked();

        break;
      case 'setUseCases':
        // Planning checked
        // Design active, submit for review active
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .activate()
          .expand();
        this.milestone('UseCases')
          .active()
          .checked()
          .unlocked();
        this.milestone('SubmitCase')
          .active()
          .unchecked()
          .unlocked();
        break;
      case 'submitUseCase':
        // Planning checked
        // Design active, submit for review active
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .activate()
          .expand();
        this.milestone('UseCases')
          .active()
          .checked()
          .unlocked();
        this.milestone('SubmitCase')
          .active()
          .checked()
          .unlocked();
        break;

        // FIRST APPROVAL NEEDED
      case 'completeDefine':
        // Planning checked
        // Design active, submit for review active
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .activate()
          .expand();
        this.milestone('UseCaseScenario')
          .active()
          .unchecked()
          .unlocked();
        break;
      case 'setScenario':
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .activate()
          .expand();
        this.milestone('UseCaseScenario')
          .active()
          .checked()
          .unlocked();
        this.milestone('SubmitDesign')
          .active()
          .unchecked()
          .unlocked();
        break;
      case 'submitDesign':
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .activate()
          .expand();
        this.milestone('UseCaseScenario')
          .active()
          .checked()
          .unlocked();
        this.milestone('SubmitDesign')
          .active()
          .checked()
          .unlocked();
        break;
      case 'completeDesign':
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .complete(true)
          .expand();
        this.section('Engineer')
          .activate()
          .expand();
        this.milestone('SourceCode')
          .active()
          .unchecked()
          .unlocked();
        break;
      case 'submitCode':
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .complete(true)
          .expand();
        this.section('Engineer')
          .activate()
          .expand();
        this.milestone('SourceCode')
          .active()
          .checked()
          .unlocked();
        break;
      case 'completeEngineer':
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .complete(true)
          .expand();
        this.section('Engineer')
          .complete(true)
          .expand();
        this.section('Deploy')
          .activate()
          .expand();
        this.milestone('Publish')
          .active()
          .checked()
          .unlocked();
        break;
      case 'completePublish':
        this.section('Discover')
          .complete(true)
          .expand();
        this.section('Define')
          .complete(true)
          .expand();
        this.section('Design')
          .complete(true)
          .expand();
        this.section('Engineer')
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

      case 'UseCases':
        this.router.navigate(['/', 'tutorials', id, 'define']);
        return 'define';
      case 'SubmitCase':
        this.router.navigate(['/', 'tutorials', id, 'submit-case']);
        return 'submit-case';
      case 'UseCaseScenario':
        this.router.navigate(['/', 'tutorials', id, 'design']);
        return 'design';
      case 'SubmitDesign':
        this.router.navigate(['/', 'tutorials', id, 'submit-design']);
        return 'submit-design';
      case 'SourceCode':
        this.router.navigate(['/', 'tutorials', id, 'code']);
        return 'code';
      case 'Publish':
        this.router.navigate(['/', 'tutorials', id, 'publish']);
        return 'publish';
      case 'EssentialFields':
      case 'TeamsAndOwners':
      case 'TagsAndMetadata':
        this.router.navigate(['/', 'tutorials', id, 'edit']);
        return 'edit';
    }
  }
}
