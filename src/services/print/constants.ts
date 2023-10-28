import {alignLine} from './align-line';
import {groupLines} from './group-lines';

export const headerConstant = groupLines(
  new Array(32).fill('-').join(''),
  'Externato São Francisco de Assis',
  alignLine('Av. Dr. Edelzio Vieira de Melo, 585 - Suíssa', 'RIGHT'),
  new Array(32).fill('-').join(''),
  'Externato São Francisco de Assis',
);

export const footerConstant = '';

export const maxCharsPerLine = 32;
