import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EntityService, EntityFormModelo, SessionService} from '@mahrio/shared';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import { MilestonesService} from "../../services/milestones.service";
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.css']
})
export class EntityEditComponent implements OnInit, OnDestroy {
  public entity;
  private _art;
  public id;
  public edit;
  public section;
  public modules;
  public design;
  private _subs;
  private _user;
  public type = 'edt';
  @ViewChild('editor') editor;
  constructor(private entityService: EntityService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public milestoneService: MilestonesService,
              private session: SessionService,
              public mileService: ConfigService,
              private router: Router) {
    this._art = this.entityService.cachedEntity;
    if ( this._art ) {
      this.setupForm( this._art );
    }
    this.id = this.route.snapshot.params.id;
    this.edit = this.route.snapshot.params.edit;
  }

  ngOnInit() {
    this._subs = this.session.userProfile.subscribe( profile => {
      this._user = profile;
    });

    this.session.sessionReady.subscribe( ready => {
      if (!!ready) {
        if (!this._art ) {
          this.entityService.list({id: this.id}).then( res => {
            this._art = res[ this.entityService.type[1].toLowerCase() ][0];
            this.setupForm(this._art);
          });
        }
      }
    });
    setTimeout( () => {
      if ( !this.dx ) {
        this.mileService.milestone('Reviewer').inactive().locked();
      }
      // else {
      //   this.mileService.section('Define').complete(true).expand();
      //   this.mileService.section('Review').activate().expand();
      //   this.mileService.milestone('Reviewer').active().unlocked();
      // }
    }, 300);
  }
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  milestone( $event ) {
    if ( this.entity.state === 'completePlanning' ) {
      this.entityService.edit( this.id, 'setSections').then( res => {

      });
    } else if ( this.entity.state === 'completeDefine') {
      this.entityService.edit( this.id, 'setScenario').then( res => {});
    }
  }
  setupForm( art? ) {
    this.entity = new EntityFormModelo(this.formBuilder, art );
  }

  submit( state ) {
    this.entityService.edit( this.id, state).then( res => {
      this.router.navigate(['/','dashboard']);
    }, err => {
      console.log('rejected');
    });
  }

  get ready() { return this._user; }

  get dx() { return this.route.snapshot.data['dx']; }
}
