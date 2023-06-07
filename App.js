import { firebaseConfig} from './firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './loginScreen/LoginPage';
import Authentication from "./appAuth/Authentication";
import {AppNavigator} from './HomePage/HomePage';


const Stack = createNativeStackNavigator();

export default function App() {
    //Authentication();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{ itemId: 86 , otherParam: 'anything you want here' }}
              options={{
                title: 'בא ונראה',
                headerShown: false,

              }}
          />
            <Stack.Screen
                name="HomePage"
                component={AppNavigator}
                />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



