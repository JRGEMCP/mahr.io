import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SessionService, EntityService} from '@mahrio/shared';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'm8io-entity-typeahead',
  templateUrl: './entity-typeahead.component.html',
  styleUrls: ['./entity-typeahead.component.scss']
})
export class EntityTypeaheadComponent implements OnInit {
  @Input() module;
  @Output() select = new EventEmitter();
  public observableEntities;
  public entity;
  public entities = [];
  public selectTitle = '';
  constructor(private entityService: EntityService, private session: SessionService) {
    this.observableEntities = Observable.create( obs => {
      obs.next('');
    }).pipe(
        mergeMap((token: string) => this.getEntitiesAsObservable(token))
      );
    const entities = this.entityService.cachedList;
    if (entities && entities.length) {
      this.entities = entities;
    }
  }

  getEntitiesAsObservable( token ) {
    const query = new RegExp(token, 'ig');

    return of(
      this.entities.filter((entity: any) => {
        return query.test(entity.title);
      })
    );
  }


  ngOnInit() {
    this.session.sessionReady.subscribe( ready => {
      if (!!ready ) {
        this.entityService.list({}).then( ents => {
          this.entities = ents[ this.entityService.type[1].toLowerCase() ];
        });
      }
    });
  }
  typeaheadOnBlur( $event ) {
    console.log( $event );
  }

}
