import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import COLOURS from '../constants/COLOURS';
import { loginCustomer } from '../services/customer-services';
import { logUserIn } from '../store/actions/user-details';
const SignIn = props => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const signInHandler = () => {
        if (email.trim() === "" || password.trim() === "") return;
        loginCustomer(email, password,
            sucResp => dispatch(logUserIn(sucResp)),
            errResp => console.log(errResp)
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.welcomeMessageContainer}>
                <Text style={styles.welcomeMessage}>Welcome to our restaurant!</Text>
                <Text style={styles.welcomeMessage}>Please sign in</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.emailInputContainer}>
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={text => setEmail(text)} value={email} autoCapitalize="none" />
                </View>
                <View style={styles.passwordInputContainer}>
                    <TextInput style={styles.textInput} placeholder="Password" onChangeText={text => setPassword(text)} value={password} secureTextEntry={true} />
                </View>
                <Button title="SignIn" onPress={signInHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    innerContainer: {

    },
    textInput: {
        height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 20, marginBottom: 10, paddingHorizontal: 10, width: 150
    },
    welcomeMessage: {
        fontSize: 25,
        color: COLOURS.secondary
    },
    welcomeMessageContainer: {
        justifyContent: "flex-start",
        marginBottom: 50,
        alignItems: "center"
    }

});

export default SignIn;