import {getDateTimeZero} from '@src/utils';
import {DateTime} from 'luxon';
import React from 'react';
import DatePickerPkg from 'react-native-date-picker';

type DatePickerProps = {
  open: boolean;
  setOpen: (input: boolean) => void;
  value: DateTime;
  setValue: (value: DateTime) => void;
  minDate?: DateTime;
  maxDate?: DateTime;
};

export const DatePicker = ({
  setValue,
  value,
  open,
  setOpen,
  maxDate,
  minDate,
}: DatePickerProps): JSX.Element => {
  return (
    <DatePickerPkg
      modal
      date={value.toJSDate()}
      open={open}
      mode="date"
      onConfirm={date => {
        console.log('Updating date to', date);
        setValue(getDateTimeZero(date));
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      minimumDate={minDate?.toJSDate()}
      maximumDate={maxDate?.toJSDate()}
    />
  );
};

// import React from 'react';
// import DatePickerPkg from 'react-native-date-picker';

// type DatePickerProps = {
//   open: boolean;
//   setOpen: (input: boolean) => void;
//   value: Date;
//   setValue: (value: Date) => void;
//   minDate?: Date;
//   maxDate?: Date;
// };

// export const DatePicker = ({
//   setValue,
//   value,
//   open,
//   setOpen,
//   maxDate,
//   minDate,
// }: DatePickerProps): JSX.Element => {
//   return (
//     <DatePickerPkg
//       modal
//       date={value}
//       open={open}
//       mode="date"
//       onConfirm={date => {
//         console.log('Updating date to', date);
//         setValue(date);
//         setOpen(false);
//       }}
//       onCancel={() => {
//         setOpen(false);
//       }}
//       minimumDate={minDate}
//       maximumDate={maxDate}
//     />
//   );
// };
