import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseService} from '@mahrio/shared';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'm8io-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleFormComponent {
  @Input() module;
  @Output() save;
  @Output() advance;
  private id;
  constructor(private courseService: CourseService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    this.save = new EventEmitter();
    this.advance = new EventEmitter();
  }

  fieldBlur( field ) {
    if (this.module.isNew ) { return; }

    if ( this.module.editable[ field ] ) {
      this.update([field, this.module.payload[field] ]);
    }
  }
  update(data) {
    this.module.editing[data[0]] = 'Saving';
    const q = data[2] || null;
    this.courseService.editModule( this.module.id, data[0], data[1], q).then( res => {
      this.module.editing[data[0]] = 'Saved';
      this.module[ data[0]] = data[1];
      this.save.emit( true );
    }, err => {
      this.module.editing[data[0]] = 'Error';
      this.save.emit( false );
    });
  }
}
