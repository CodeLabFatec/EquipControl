import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardTypeOptions,
  InputModeOptions,
} from 'react-native';

interface props {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  value?: any;
  inputStyle?: any;
  labelStyle?: any;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  rightIcon?: React.ReactNode;
  inputMode?: InputModeOptions;
}

function InputComponent({
  label,
  placeholder,
  keyboardType,
  maxLength,
  onChangeText,
  value,
  inputStyle,
  labelStyle,
  onBlur,
  secureTextEntry,
  editable,
  rightIcon,
  inputMode,
}: props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          inputMode={inputMode}
          placeholderTextColor={'#E2D7C1'}
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          style={[styles.default, inputStyle]}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          editable={editable ?? true}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 10,
  },
  default: {
    backgroundColor: '#363636',
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    color: '#EEEEEE',
  },
  label: {
    color: '#EEEEEE',
    fontSize: 18,
    marginBottom: 5,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    backgroundColor: 'blue',
  }
  
});

export default InputComponent;
