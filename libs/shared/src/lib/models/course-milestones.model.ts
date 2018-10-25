import { MilestoneSectionModel } from './milestone-section-model';

export class CourseMilestonesModel {
  private _sections;
  private courseLink;
  private modules;
  private router;
  constructor( router, courseLink, modules ) {
    this.router = router;
    this._sections = [];
    this.courseLink = courseLink;
    this.modules = modules;
    modules.map( module => {
      let m = this.addSection(module.title);
      module.content.map( (sec, i) => {
        m.add( sec.id, 'Section ' + (i + 1) );
      });
    });
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
    for ( let index = 0; index < this.modules.length; index++ ) {
      const m = this.modules[index];
      this.section( m.title ).activate().expand();
      for ( let sec = 0; sec < m.content.length; sec++ ) {
        const section = m.content[sec];
        this.milestone( section.id).active().unlocked();
      }
    }
  }

  tryParse( state ) {
    for ( let index = 0; index < this.modules.length; index++ ) {
      const m = this.modules[index];
      this.section( m.title ).activate().expand();
      for ( let sec = 0; sec < m.content.length; sec++ ) {
        const section = m.content[sec];
        if ( state === section.id ) {
          this.milestone( section.id).inactive().unlocked();
        } else {
          this.milestone( section.id).active().unlocked();
        }
      }
    }
  }

  milestoneSelected($event) {
    this.router.navigate(['/courses', this.courseLink, 'modules', $event]);
  }
}
