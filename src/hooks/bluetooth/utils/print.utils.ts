import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
import RNQRGenerator from 'rn-qr-generator';
import {PrintPurchaseType} from '..';

export enum ALIGN {
  LEFT = 0,
  CENTER = 1,
  RIGHT = 2,
}

export const printerIsValid = async (): Promise<boolean> => {
  return await BluetoothEscposPrinter.printerInit()
    .then(() => true)
    .catch(err => {
      console.debug('[ble-printer-init-error]', err);
      return false;
    });
};

export const printLine = async (line: string, lineBreak = 1): Promise<void> => {
  const lineBreaks = new Array(lineBreak).fill('\n');
  await BluetoothEscposPrinter.printText(`${line}${lineBreaks.join('')}`, {
    encoding: '860',
  });
};

export const printLines = async (...lines: Array<string>): Promise<void> => {
  await Promise.all(
    lines.map(async line => {
      await printLine(line);
    }),
  );
};

export const printDivisor = async (lineBreaks = 1): Promise<void> => {
  await printLine('--------------------------------', lineBreaks);
};

export const printAlign = async (align: ALIGN) => {
  await BluetoothEscposPrinter.printerAlign(align);
};

export const printSpaces = async (spaces = 1) => {
  const breaks = new Array(spaces).fill('\n');
  await BluetoothEscposPrinter.printText(breaks.join(''), {});
};

export const printQRCode = async (content: string) => {
  const {base64} = (await RNQRGenerator.generate({
    value: content,
    height: 200,
    width: 200,
    correctionLevel: 'H',
    base64: true,
  })) as {base64: string};

  await BluetoothEscposPrinter.printPic(base64, {width: 200, left: 85});
};

export const printHeader = async (input: PrintPurchaseType) => {
  await printAlign(ALIGN.CENTER);
  await printLine('Externato São Francisco de Assis');
  await printDivisor();
  if (input.reprint) {
    await printLine('REIMPRESSÃO');
    await printLine(
      `Data original:\n${input.createdAt.toLocaleString('pt-br')}`,
      2,
    );
  }
  await printAlign(ALIGN.LEFT);
  await printLine('Av. Dr. Edelzio Vieira de Melo, 585 - Suíssa');
  await printLine('CNPJ:  10.970.689/0010-21');
  const now = new Date();
  await printLine(
    `${now.toLocaleDateString('pt-br')} - ${now.toLocaleTimeString('pt-br')}`,
  );
  await printAlign(ALIGN.CENTER);
  // 32
  await printLine('Ordem de Compra', 2);
  await printAlign(ALIGN.LEFT);
  await printLine('Qtd. Desc.                Valor');
};
