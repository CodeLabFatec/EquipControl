import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface DropdownItemProps {
  label: string;
  value: string;
  containerStyle?: any;
  textStyle?: any;
  onPress?: () => void;
}

function DropdownItem({
  label,
  containerStyle,
  onPress,
  textStyle,
}: DropdownItemProps) {
  const [clicked, setClicked] = useState(false);

  const stylesItem = StyleSheet.create({
    background: {
      backgroundColor: clicked ? '#fffff' : 'transparent',
    },
  });

  return (
    <Pressable
      style={[styles.item, stylesItem.background, containerStyle ?? null]}
      onPress={onPress}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}>
      <Text style={[styles.itemText, textStyle ?? null]}>{label}</Text>
    </Pressable>
  );
}

interface Props {
  items: DropdownItemProps[];
  useArrows?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  enable?: boolean;
  color?: 'white' | 'gray';
  value?: string;
  containerStyle?: any;
  onSelect?: (value: string) => void;
}

function Dropdown({
  items,
  placeholder,
  useArrows,
  children,
  enable = true,
  color = 'white',
  containerStyle,
  value,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const onItemSelect = (item: {
    value: string;
    label: string;
    onPress?: () => void;
  }) => {
    setOpen(false);
    if (onSelect) onSelect(item.value);
    if (item.onPress) item.onPress();
  };

  return (
    <View style={containerStyle ?? styles.container}>
      <Pressable
        disabled={!enable}
        style={
          !children
            ? [
                styles.button,
                color === 'gray' ? {backgroundColor: '#ffffff'} : {},
                !enable ? {backgroundColor: '#BFBFBF'} : {},
              ]
            : null
        }
        onPress={() => setOpen(!open)}>
        {placeholder && useArrows && (
          <Text style={styles.buttonText}>
            {items.find(option => option.value === value)?.label || placeholder}
          </Text>
        )}
        {useArrows && (
          <>
            {open ? (
              <Icon
                name="arrow-up"
                style={{...styles.buttonIcon, width: 14, height: 14}}
              />
            ) : (
              <Icon
                name="arrow-down"
                style={{...styles.buttonIcon, width: 14, height: 14}}
              />
            )}
          </>
        )}
        {children}
      </Pressable>

      {open && (
        <FlatList
          style={styles.list}
          data={items}
          renderItem={item => (
            <DropdownItem
              label={item.item.label}
              value={item.item.value}
              containerStyle={item.item.containerStyle}
              textStyle={item.item.textStyle}
              onPress={() => onItemSelect(item.item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#656565',
    flex: 1,
    marginRight: 16,
  },
  buttonPlaceholder: {
    color: '#BFBFBF',
    flex: 1,
    marginRight: 16,
  },
  buttonIcon: {
    marginRight: 4,
  },
  list: {
    width: 150,
    height: 100,
    marginTop: 18,
    paddingVertical: 4,
    backgroundColor: '#444',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {},
  itemText: {
    color: '#ffffff',
    padding: 8,
  },
});

export default Dropdown;
