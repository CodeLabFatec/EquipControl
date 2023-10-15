import React from 'react';
import {View} from 'react-native';
import {Picker, PickerItemProps} from '@react-native-picker/picker';

interface PickerProps {
  items: PickerItemProps[];
  value: any;
  placeholder: string;
  containerStyle?: any;
  pickerStyle?: any;
  itemStyle?: any;
  onBlur?: () => void;
  onChange: (value) => void;
}

export const PickerComponent = ({
  items,
  value,
  placeholder,
  containerStyle,
  pickerStyle,
  itemStyle,
  onBlur,
  onChange,
}: PickerProps) => {
  return (
    <View style={containerStyle}>
      <Picker
        onBlur={onBlur}
        style={pickerStyle}
        onValueChange={e => {
          if (e) onChange(e);
        }}
        selectedValue={value ?? null}
        placeholder={placeholder}>
        <Picker.Item label={placeholder} style={itemStyle} value={null} />
        {items.map(i => (
          <Picker.Item key={i.value} value={i.value} label={i.label} />
        ))}
      </Picker>
    </View>
  );
};
