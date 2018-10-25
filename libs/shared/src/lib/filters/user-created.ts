import { FilterModelo } from "./filter.modelo";

export class UserCreated extends FilterModelo {
  constructor( uid ) {
    super('filter.user-creator', 'OR', (entity) => {
      return entity.creator && entity.creator._id === uid;
    });
  }
}
