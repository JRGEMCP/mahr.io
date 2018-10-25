import { FilterModelo } from "./filter.modelo";

export class SubmitDesignFilter extends FilterModelo {
  constructor( ) {
    super('filter.submit-design-state', 'AND', (entity) => entity.state === 'submitDesign');
  }
}
