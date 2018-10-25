import { FilterModelo } from "./filter.modelo";

export class FavoriteFilter extends FilterModelo {
  constructor( favs ) {
    super('filter.favorite', 'AND', () => 1);
  }
}
