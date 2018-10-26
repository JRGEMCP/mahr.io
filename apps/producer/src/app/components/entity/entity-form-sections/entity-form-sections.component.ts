import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityService, EnvService} from '@mahrio/shared';
import { ActivatedRoute} from "@angular/router";
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'm8io-entity-form-sections',
  templateUrl: './entity-form-sections.component.html',
  styleUrls: ['./entity-form-sections.component.css']
})
export class EntityFormSectionsComponent implements OnInit {
  @Input() entity;
  @Input() section;
  @Output() save;
  @Output() milestone;
  public mRef;
  private id;
  public sectionWindow;
  public sectionEditWindow;
  public sections = [];
  public i = -1;
  public add = true;
  public modules;
  public textArea;
  public textEditor;
  public act = 1;
  public type;
  public name;
    public toBeDeleted = {
      id: null,
      index: null,
      name: null
    };
  constructor(private entityService: EntityService, private route: ActivatedRoute, private bsModal: BsModalService,
              private milestones: ConfigService, public env: EnvService) {
    this.id = this.route.snapshot.params.id;
    this.save = new EventEmitter();
    this.milestone = new EventEmitter();
  }
  ngOnInit() {
    this.sections = this.entity.sections;

    const values = [
      { id: 1, value: 'Fredrik Sundqvist' },
      { id: 2, value: 'Patrik Sjölin' }
    ];
    this.modules = {
      imageResize: {},
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['clean'], // remove formatting button
        ['link', 'image', 'video'] // link and image, video
      ],
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        source: function (searchTerm) {
          if (searchTerm.length === 0) {
            this.renderList(values, searchTerm);
          } else {
            const matches = [];
            for (let i = 0; i < values.length; i++)
              if (~values[i].value.toLowerCase().indexOf(searchTerm)) matches.push(values[i]);
            this.renderList(matches, searchTerm);
          }
        },
      }
    };

  }
  toggle( type ) {
    this.type = type;
  }
  setFocus($event) {

  }
  ngOnChanges( changes ) {
    if (changes['section'] && changes['section'].currentValue ) {
      let sec = changes['section'].currentValue;
      if ( this.sections.some( s => s._id === sec._id )) {
        this.sections.find( s => s._id === sec._id ).body = sec.body;
      } else {
        this.sections.push( sec );
      }
      this.add = true;
      this.i = -1; debugger;
      this.sectionWindow = '';
      this.textArea = '';
      this.textEditor = '';
    } else if ( changes['entity'] && changes['entity'].currentValue ) {
      this.sections = this.entity.sections;
    }
  }
  saveSection( index, section ) {
    let fnd =  this.sections.find( s => s._id === this.sections[index]._id );
    fnd.body = section;
    this.add = true;
    this.textArea = '';
    this.textEditor = '';
    this.update(['section', {body: section, type: this.sections[index].type}, this.sections[index]._id]);
  }
  addSection( section ) {
    this.update(['section', {body: section, type: this.type}]);
  }
  editSection( section, index ) {
    if ( !this.sectionWindow || this.sectionWindow === '' ) {
      this.sectionEditWindow = this.sections[ index ].body;
      this.textEditor = this.sections[ index ].body;
      this.textArea = this.sections[ index ].body;
      this.i = index;
      this.add = false;
    } else {
      // tell user to save current work
      alert('cannot edit section until you clear or save current work');
    }
  }
  update(data) {
    const q = data[2] || null;
    this.entityService.edit( this.id, data[0], data[1], q).then( res => {
      this.entity.sections.push( res['section'] );
      this.textArea = '';
      this.textEditor = '';
      this.sectionEditWindow = '';
      this.sectionWindow = '';
      this.i = -1;
      if ( this.entity.state === 'completePlanning') {
        this.entityService.edit( this.id, 'setSections').then( () => {
          this.entity.state = 'setSections';
          this.milestones.milestone('SetSections').checked();
          this.milestones.milestone('SubmitSections').unlocked().active();
        });
      }
    }, err => {
      console.log('ERROR');
    });
  }

  removeSection( section, index ) {
    this.toBeDeleted.name = section.body;
    this.toBeDeleted.index = index;
    this.toBeDeleted.id = section._id;
  }
  confirm( modal ) {
    this.entityService.removeSection( this.entity.id, this.toBeDeleted.id).then( () => {
      modal.hide();
      this.sections.splice( this.toBeDeleted.index, 1 );
    });
  }
  decline( modal ) {
    modal.hide();
    this.toBeDeleted = {
      id: null,
      index: null,
      name: null
    };
  }
}
