import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function HomePage({route, navigation}) {
    const {itemId, otherParam} = route.params;
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to HomePage"
                onPress={() => navigation.pop('HomePage')}
            />
            <Button
                title="Go to anteater Home"
                onPress={() => navigation.push('HomePage', {
                    itemId: Math.floor(Math.random() * 100),
                    otherParam: 'anything you want here',
                })}
            />
            <Button title="Go back" onPress={() => navigation.goBack()}/>
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
            <Button
                title="Done"
                onPress={() => {
                    // Pass and merge params back to home screen
                    navigation.navigate({
                        name: 'HomePage',
                        params: { itemId: 11111 },
                        merge: true,
                    });
                }}
            />
        </View>
    );
}

/*
to posh navigation to the same page:
            <Button
                title="Go to anteater HomePage"
                onPress={() => navigation.push('HomePage')}
            />
 */