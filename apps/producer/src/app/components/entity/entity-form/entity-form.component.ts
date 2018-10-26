import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EntityService} from '@mahrio/shared';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'm8io-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Input() entity;
  @Output() save;
  @Output() advance;
  private id;
  constructor(private entityService: EntityService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    this.save = new EventEmitter();
    this.advance = new EventEmitter();
  }
  ngOnInit() {
    console.log( this.entity.featured );
  }

  fieldBlur( field ) {
    if (this.entity.isNew ) { return; }

    if ( this.entity.editable[ field ] ) {
      this.update([field, this.entity.payload[field] ]);
    }
  }
  update(data) {
    this.entity.editing[data[0]] = 'Saving';
    const q = data[2] || null;
    this.entityService.edit( this.id, data[0], data[1], q).then( res => {
      this.entity.editing[data[0]] = 'Saved';
    }, err => {
      this.entity.editing[data[0]] = 'Error';
    });
  }
  toggleCheck() {
    this.update(['featured', !this.entity.payload['featured']]);
  }
}
