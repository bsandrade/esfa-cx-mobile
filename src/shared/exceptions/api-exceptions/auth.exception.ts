import {ApiException} from './api-exception';

export class AuthException extends ApiException {
  constructor() {
    super('AuthException');
  }
}
