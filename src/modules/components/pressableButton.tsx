import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

interface props {
  children?: string;
  pressableStyle?: any;
  textStyle?: any;
  disabled?: boolean;
  onPress?: () => void;
}

function PressableButton({
  children,
  pressableStyle,
  textStyle,
  disabled,
  onPress,
}: props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.pressableContainer, pressableStyle]}
        disabled={disabled}
        onPress={onPress}>
        <Text style={[styles.default, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 10,
  },
  pressableContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  default: {
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: '#EEEEEE',
    fontSize: 20,
  },
});

export default PressableButton;
