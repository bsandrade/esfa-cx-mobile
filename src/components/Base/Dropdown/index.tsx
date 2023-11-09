import React, {useState} from 'react';
import {Container} from './styles';
import {useTheme} from 'styled-components/native';

export type DropdownItem = {
  label: string;
  value: string;
};

type DrowdownAppProps = {
  items: Array<DropdownItem>;
  setSelectedItem: React.Dispatch<any>;
  selectedItem: string;
};

export const DropdownApp = ({
  items,
  setSelectedItem,
  selectedItem,
}: DrowdownAppProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <Container
      open={open}
      items={items}
      value={selectedItem}
      setValue={setSelectedItem}
      setOpen={setOpen}
      dropDownContainerStyle={{
        borderColor: theme.colors.primary.main,
      }}
      style={{
        borderColor: theme.colors.primary.main,
      }}
      textStyle={{
        color: theme.colors.text.primary,
      }}
    />
  );
};
