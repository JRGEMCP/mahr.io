import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { SessionService } from '../../services/session.service';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'm8io-entity-filter',
  templateUrl: './entity-filter.component.html',
  styleUrls: ['./entity-filter.component.scss']
})
export class EntityFilterComponent implements OnInit {
  public user;
  public filters;
  public entityName;
  @Input() count;
  @Output() textFilter;
  @Input() type;
  @Input() of;

  @ViewChild('textFilter') textFilterEl;
  constructor(private session: SessionService) {
    this.textFilter  = new EventEmitter();
    this.entityName = this.session.env['c']['asset'];
  }

  ngOnInit() {
    this.session.userSession.subscribe( session => {
      this.user = session;
    });
  }

  onTextFilterChange( val ) {
    this.textFilter
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).next( val );
  }
}
