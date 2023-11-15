import {ApiException} from './api-exception';

export class ClientException extends ApiException {
  constructor(message: string) {
    super(message);
  }
}
