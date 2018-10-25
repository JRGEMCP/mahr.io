import { FilterModelo } from "./filter.modelo";

export class FeaturedFilter extends FilterModelo {
  constructor( ) {
    super('filter.featured', 'AND', (entity) => entity.featured);
  }
}
