import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface props {
  label?: string;
  labelStyle?: any;
  rightIcon?: React.ReactNode;
}

export default function SwitchComponent({label, labelStyle, rightIcon}: props) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    display: 'flex',
    marginBottom: 10,
    alignContent: 'space-between',
  },
  label: {
    color: '#EEEEEE',
    fontSize: 15,
    marginBottom: 5,
  },
  labelContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  rightIconContainer: {
    position: 'absolute',
    right: '5%',
    top: '-5%',
  },
});
