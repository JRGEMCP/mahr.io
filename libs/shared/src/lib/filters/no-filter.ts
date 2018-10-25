import { FilterModelo } from "./filter.modelo";

export class NoFilter extends FilterModelo {
  constructor( ) {
    super('filter.no-filter', 'OR', () => true);
  }
}
