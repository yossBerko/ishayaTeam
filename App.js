import {StatusBar} from 'expo-status-bar';
import { firebaseConfig} from './firebaseConfig';
import { initializeApp } from "firebase/app";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Homepage from "./Home";
import {initializeDataBase, writeUserData, getWorkers} from "./LoginAuth";

export const app= initializeApp(firebaseConfig);
const Stack = createStackNavigator();

export default function App() {
    //initializeDataBase(app);
    //const workers= getWorkers();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen
                    name="HomePage"
                    component={Homepage}
                    initialParams={{ itemId: 86 , otherParam: 'anything you want here' }}
                    options={{
                        title: 'בא ונראה',

                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
//headerShown: false
