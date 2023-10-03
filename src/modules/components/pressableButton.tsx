import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';

interface props {
  children?: string;
  pressableStyle?: any;
  textStyle?: any;
  onPress?: () => void,
}

function PressableButton({children, pressableStyle, textStyle, onPress}: props) {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.pressableContainer, pressableStyle]} onPress={onPress}>
        <Text style={[styles.default,textStyle]}>{children}</Text>
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
    marginTop: 10
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
