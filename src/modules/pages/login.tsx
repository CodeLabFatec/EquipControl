import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text, Pressable } from 'react-native';
import InputComponent from '../components/inputComponent';

function Login({ navigation }) {

    return (

        <View>
            <InputComponent
                label='Login'
                inputStyle={styles.inputWidth}
                labelStyle={styles.labelWidth}
                placeholder='UserName'
            />

            <InputComponent
                label='Senha'
                inputStyle={styles.inputWidth}
                labelStyle={styles.labelWidth}
                placeholder='*************'
            />
            <Pressable style={styles.pressableContainer}>
                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </Pressable>
        </View>

    );


}

const styles = StyleSheet.create({
    inputWidth: {
        width: '93%',
    },
    labelWidth: {
        marginLeft: 15,
    },
    forgotPassword: {
        color: '#EEEEEE',
    },
    pressableContainer: {
        display: 'flex',
        alignItems: 'center',
    }
});

export default Login;