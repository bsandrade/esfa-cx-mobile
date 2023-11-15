import {ApiException} from './api-exception';

export class InternalException extends ApiException {
  constructor() {
    super('Ocorreu um erro. Tente novamente mais tarde');
  }
}
