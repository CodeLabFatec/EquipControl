import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface props {
  label?: string;
  placeholder?: string;
  onChangeText: (codes: any[]) => void;
  value: any;
  inputStyle?: any;
  labelStyle?: any;
  onBlur?: () => void;
}

function CodeInput({value, onChangeText, inputStyle}: props) {
  const handleCodeChange = (text, index) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newCode = [...value];
      newCode[index] = text;
      onChangeText(newCode);

      if (text !== '') {
        focusNextInput(index + 1);
      } else {
        focusPreviousInput(index - 1);
      }
    }
  };

  const focusNextInput = nextIndex => {
    if (nextIndex < 6) {
      this[`inputRef${nextIndex}`].focus();
    }
  };

  const focusPreviousInput = prevIndex => {
    if (prevIndex >= 0) {
      this[`inputRef${prevIndex}`].focus();
    }
  };

  return (
    <View style={styles.container}>
      {value.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          onChangeText={text => handleCodeChange(text, index)}
          value={value}
          keyboardType="numeric"
          maxLength={1}
          ref={ref => (this[`inputRef${index}`] = ref)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    width: 45,
    height: 70,
    borderWidth: 1,
    borderColor: '#77A490',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 5,
    color: '#EEEEEE',
  },
});

export default CodeInput;
