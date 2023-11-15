import axios from 'axios';
import {ESFA_API_URL, ESFA_API_TOKEN} from '@env';

export const api = axios.create({
  baseURL: ESFA_API_URL,
  headers: {
    'api-key': ESFA_API_TOKEN,
  },
});
