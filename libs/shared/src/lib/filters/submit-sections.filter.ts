import { FilterModelo } from "./filter.modelo";

export class SubmitSectionsFilter extends FilterModelo {
  constructor( ) {
    super('filter.submit-sections', 'AND', (entity) => entity.state === 'submitSections');
  }
}
