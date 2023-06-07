import * as React from 'react';
import {ScrollView, View, Image, StyleSheet, Text} from 'react-native';
import {NativeBaseProvider, Box, Pressable, Flex, Spacer, HStack, Badge,Container,Center} from "native-base";


import loginLogo from './../assets/loginLogo.png'
import LoginForm from './loginForm';


export default function Login() {
    return (

            <ScrollView style={styles.container}
                        ScrollView={'center'}
                        justifyContent={'center'}
            >
                <View style={styles.content}>
                <Image source={loginLogo}
                       style={styles.image}
                       resizeMode="contain"/>
                <LoginForm />
                </View>
            </ScrollView>

    );

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        position: 'relative',
        resizeMode: 'contain',
        top: 0,
        left: 0,
        width: '100%',
        height: 400,
        backgroundColor: "transparent",

        alignSelf: 'center',
        padding: 115,
        flex: 1,
        marginVertical: 30,
    },

});