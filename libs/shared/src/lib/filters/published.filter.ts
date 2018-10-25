import { FilterModelo } from "./filter.modelo";

export class PublishedFilter extends FilterModelo {
  constructor( ) {
    super('filter.published-state', 'AND', (entity) => entity.state === 'completePublish');
  }
}
