import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MilestonesService } from "../../services/milestones.service";
import {FormBuilder} from "@angular/forms";
import {EntityService, EntityFormModelo} from '@mahrio/shared';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.css']
})
export class EntityCreateComponent implements OnInit {
  public entity;
  public nav = {
    title: 'Create New '
  };
  public state = 'initiatePlanning';
  constructor(private milestoneService: MilestonesService, private router: Router,
              public mileService: ConfigService, private formBuilder: FormBuilder, private entityService: EntityService) {
    this.entity = new EntityFormModelo(this.formBuilder);
    this.nav.title += this.entityService.type[0];
  }

  ngOnInit() {
  }
  save() {
    this.entityService.create( this.entity.form.value).then( res => {
      this.router.navigate(['/', this.entityService.type[1].toLowerCase(), res['tutorial']._id, 'edit']);
    }, err => {
      console.log('ARTICLE ERROR');
    });
  }

}
