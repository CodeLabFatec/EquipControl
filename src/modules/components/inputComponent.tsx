import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, KeyboardTypeOptions, ColorValue, TextStyle, StyleProp } from 'react-native';

interface props {
    label?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    maxLength?: number,
    onChangeText?: (text: string) => void,
    value?: any,
    inputStyle?: any,
    labelStyle?: any,
    onBlur?: () => void,
}

function InputComponent({ label, placeholder, keyboardType, maxLength, onChangeText, value, inputStyle, labelStyle, onBlur }: props) {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor={'#E2D7C1'}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    value={value}
                    style={[styles.default, inputStyle]}
                    onBlur={onBlur}
                />

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
    },
    label: {
        color: '#EEEEEE',
        fontSize: 18,
        marginBottom: 5
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InputComponent;