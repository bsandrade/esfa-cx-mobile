import {maxCharsPerLine} from './constants';

export function alignLine(line: string, align: 'CENTER' | 'LEFT' | 'RIGHT') {
  if (line.length <= maxCharsPerLine) {
    return alignLineFixed(line, align);
  } else {
    const lines = line.length / 32;
    const returnValue: Array<string> = [];
    for (let i = 0; i < lines; i++) {
      returnValue.push(
        alignLineFixed(line.substring(i * 32, i * 32 + 32), align),
      );
    }
    return returnValue.join('\n');
  }
}

function alignLineFixed(line: string, align: 'CENTER' | 'LEFT' | 'RIGHT') {
  switch (align) {
    case 'LEFT': {
      return line;
    }
    case 'CENTER': {
      const spaces = new Array(
        maxCharsPerLine - Math.floor(line.length / 2),
      ).fill(' ');
      return `${spaces.join('')}${line}${spaces.join('')}`;
    }
    case 'RIGHT': {
      const spaces = new Array(maxCharsPerLine - line.length).fill(' ');
      return `${spaces.join('')}${line}`;
    }
  }
}
