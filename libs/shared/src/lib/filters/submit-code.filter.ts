import { FilterModelo } from "./filter.modelo";

export class SubmitCodeFilter extends FilterModelo {
  constructor( ) {
    super('filter.submit-code-state', 'AND', (entity) => entity.state === 'submitCode');
  }
}
