import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseService} from '@mahrio/shared';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'm8io-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  @Input() entity;
  public img;
  private id;
  constructor(private entityService: CourseService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
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
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      //debugger;
      reader.onload = (e) => {
        // debugger;
        // var binaryString = e.target.result;
        // this.img = 'data:'+file.type+';base64,' + btoa(binaryString);
      };
      //reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.img = 'data:image/png;base64,' + btoa(binaryString);
  //   console.log(btoa(binaryString));
  // }
}
