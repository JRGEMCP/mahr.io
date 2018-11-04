// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {FormBuilder, Validators} from "@angular/forms";
//
// @Component({
//   selector: 'm8io-course-form-modules',
//   templateUrl: './course-form-modules.component.html',
//   styleUrls: ['./course-form-modules.component.scss']
// })
// export class CourseFormModulesComponent implements OnInit {
//   @Input() entity;
//   @Output() save = new EventEmitter();
//   public form;
//   public sectionWindow;
//   constructor(private formBuilder: FormBuilder) {
//     this.form = this.formBuilder.group({
//       title: ['', Validators.compose([Validators.required])],
//       deck: ['', Validators.compose([Validators.required])],
//       link: ['', Validators.compose([Validators.required])]
//     });
//   }
//
//   ngOnInit() {
//   }
//
//   titleRequired() {
//     return this.form.controls.title.hasError('required');
//   }
//   deckRequired() {
//     return this.form.controls.deck.hasError('required');
//   }
//   linkRequired() {
//     return this.form.controls.link.hasError('required');
//   }
//   saveModule( index, module ) {
//     this.save.emit(['module', module, this.entity.modules[index]._id]);
//   }
//   addModule( module ) {
//     this.save.emit(['module', module]);
//   }
//   editModule( section, index ) {
//
//   }
//
//
// }
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService} from '@mahrio/shared';
import { ActivatedRoute} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfigService } from '../../../services/config.service';
import { ModuleFormModel} from '@mahrio/shared';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'm8io-course-form-modules',
  templateUrl: './course-form-modules.component.html',
  styleUrls: ['./course-form-modules.component.scss']
})
export class CourseFormModulesComponent implements OnInit {
  @Input() course;
  @Input() section;
  @Output() save;
  @Output() milestone;
  public mRef;
  private id;
  public moduleWindow;
  public modules = [];
  public i = -1;
  public add = true;
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
  public md;
  public mdl;
  constructor(private courseService: CourseService, private route: ActivatedRoute, private bsModal: BsModalService,
              private milestones: ConfigService, private formBuilder: FormBuilder) {
    this.id = this.route.snapshot.params.id;
    this.save = new EventEmitter();
    this.milestone = new EventEmitter();
    this.mdl = new ModuleFormModel(this.formBuilder);
  }
  ngOnInit() {
    this.modules = this.course.modules;

    const values = [
      { id: 1, value: 'Fredrik Sundqvist' },
      { id: 2, value: 'Patrik Sjölin' }
    ];
    this.md = {
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
  doneModule() {
    this.i = -1;
    this.add = true;
    this.textArea = '';
    this.textEditor = '';
  }
  saveModule( index, module ) {
    this.i = -1;
    let fnd =  this.modules.find( s => s._id === this.modules[index]._id );
    fnd.body = module;
    this.add = true;
    this.textArea = '';
    this.textEditor = '';
    this.update(['section',
      {body: module, type: this.modules[index].type},
      this.modules[index]._id], (res) => {

    });
  }
  addModule( module ) {
    this.update(['module', module.payload], (res) => {
      this.course.modules.push( new ModuleFormModel(this.formBuilder, res['module']) );
      this.mdl = new ModuleFormModel(this.formBuilder);
    });
  }
  editModule( section, index ) {
    if ( !this.moduleWindow || this.moduleWindow == '' ) {
      this.moduleWindow = this.modules[ index ].body;
      this.textEditor = this.modules[ index ].body;
      this.textArea = this.modules[ index ].body;
      this.i = index;
      this.add = false;
    } else {
      // tell user to save current work
      alert('cannot edit section until you clear or save current work');
    }
  }
  update(data, cb) {
    const q = data[2] || null;
    this.courseService.edit( this.id, data[0], data[1], q).then( res => {
      cb( res );
      if ( this.course.state === 'completePlanning') {
        this.courseService.edit( this.id, 'completeDefine').then( () => {
          this.course.state = 'setModules';
          this.milestones.milestone('setModules').checked();
          this.milestones.milestone('SubmitModules').unlocked().active();
        });
      }
    }, err => {
      console.log('ERROR');
    });
  }

  removeModule( module, index ) {
    this.toBeDeleted.name = module.title;
    this.toBeDeleted.index = index;
    this.toBeDeleted.id = module.id;
  }
  confirm( modal ) {
    this.courseService.removeModule( this.course.id, this.toBeDeleted.id).then( () => {
      modal.hide();
      this.modules.splice( this.toBeDeleted.index, 1 );
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
  saved($val) {
    this.save.emit($val);
  }
}
