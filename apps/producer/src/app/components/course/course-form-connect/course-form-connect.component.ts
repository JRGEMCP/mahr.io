import {Component, Input, OnInit} from '@angular/core';
import {EntityService, ModuleService, SessionService, ContentModel } from '@mahrio/shared';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'm8io-course-form-connect',
  templateUrl: './course-form-connect.component.html',
  styleUrls: ['./course-form-connect.component.scss']
})
export class CourseFormConnectComponent implements OnInit {
  @Input() course;
  public modules;
  public textArea;
  public textEditor;
  public mods;
  public entities = [];
  public entity;
  public observableEntities;
  public idx = [-1, -1];
  private _ready;
  public asyncModel;
  private _eType;
  public viewEntity;
  private type = -1;
  public sectionWindow;
  public section = {
    body: null,
    name: null
  };
  private toBeDeleted = {
    id: null,
    index: null,
    name: null
  };
  constructor(private moduleService: ModuleService, private entityService: EntityService, private session: SessionService) {
    this._eType = this.entityService.type[1].toLowerCase();
    const values = [
      { id: 1, value: 'Fredrik Sundqvist' },
      { id: 2, value: 'Patrik Sjölin' }
    ];
    this.mods = {
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
    this.observableEntities = Observable.create( obs => {
      obs.next(this.asyncModel);
    }).pipe(
      mergeMap((token: string) => this.getEntitiesAsObservable(token))
    );
  }

  ngOnInit() {
    this.entities = this.entities || [];
    this.modules = this.course.modules;

    const entities = this.entityService.cachedList;
    if (entities && entities.length) {
      this.entities = entities;
      this._ready = true;
      this.populateModuleContent();
    }
    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this.entityService.list({}).then( ents => {
          this.entities = ents[ this._eType ].filter( ent => ent.published);
          this._ready = true;
          this.populateModuleContent();
        });
      }
    });
  }
  populateModuleContent() {
    this.modules.map( mod => {
      mod.content.map( cont => {
        if ( cont.type === this._eType ) {
          cont.entity = this.entities.find( ent => ent._id === cont.id );
        }
      });
    });
  }
  /* ADD TO CONTENT */
  onSelect(module, $event) {
    const eLink = this._eType + '__' + $event.item._id;
    this.update(module.id, ['content', this._eType, eLink], () => {
      const cont = new ContentModel(eLink);
      cont.entity = this.entities.find( ent => ent._id === $event.item._id);
      module.content.push( cont );
      this.asyncModel = '';
    });
  }
  addSection( id, content ) {
    this.moduleService.addContent('section', {body: content, type: this.type}).then( res => {
      this.update(id, ['content', 'sections__' + res['section']._id], () => {
        this.modules.find( m => m.id === id).content.push( new ContentModel(res['section']));
        this.textArea = '';
        this.textEditor = '';
      });
    });
  }
  update( id, data, cb ) {
    this.moduleService.edit(id, data[0], data[1], data[2]).then( res => {
      cb( res );
    });
  }

  /* SERVE ENTITIES */
  getEntitiesAsObservable( token ) {
    const query = new RegExp(token, 'ig');

    return of(
      this.entities.filter((entity: any) => {
        return query.test(entity.title);
      })
    );
  }
  get ready() { return this._ready; }

  onBlur($event) {
    console.log(this._eType, $event);
  }

  editContent( module, mI, cI) {
    this.idx = [mI, cI];
    this.sectionWindow = this.modules[mI].content[cI].data.body;
    this.textArea = this.modules[mI].content[cI].data.body;
    this.textEditor = this.modules[mI].content[cI].data.body;
  }
  saveContent( id, data) {
    this.moduleService.editContent(id, 'body', data ).then( (res) => {
      this.course.modules[ this.idx[0]].content[ this.idx[1] ].data.body = data;
      this.idx = [-1, -1];
      this.textArea = '';
      this.textEditor = '';
    });
  }
  removeContent( i, j, data) {
    this.section['i'] = i;
    this.section['j'] = j;
    this.section.body = data.body;
    this.section.name = data;

  }
  confirm( modal ) {
    const sec = this.modules[ this.section['i'] ].content[ this.section['j'] ];
    if ( this.section.body ) {
      this.moduleService.removeSectionContent( sec.data._id ).then( res => {
        this.moduleService.removeContent( this.modules[ this.section['i'] ].id, sec.type + '__' + sec.data._id).then( res2 => {
          // splice
          this.modules[this.section['i']].content.splice( this.section['j'], 1 );
          modal.hide();
        });
      });
    } else {
      this.moduleService.removeContent( this.modules[ this.section['i'] ].id, sec.type + '__' + sec.id).then( res2 => {
        // splice
        this.modules[this.section['i']].content.splice( this.section['j'], 1 );
        modal.hide();
      });
    }
  }
  decline( modal ) {
    modal.hide();
  }
  toggle( type ) {
    this.type = type;
  }
}
