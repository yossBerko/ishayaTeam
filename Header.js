import React from "react";
import { StyleSheet,Text,View,Image } from "react-native";
import logo from './assets/IshayaLogo.png';

export default function Header(props){
    return(
        <View style={styles.Header}>
            <Image source={logo} style={{ width: 70, height: 70}} />
        </View>
    );
}

const styles= StyleSheet.create({

    Header: {
        width: '100%',
        height: 70,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
})