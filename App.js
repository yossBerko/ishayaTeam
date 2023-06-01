import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Homepage from "./Home";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen
                    name="HomePage"
                    component={Homepage}
                    initialParams={{ itemId: 86 , otherParam: 'anything you want here' }}
                    options={{
                        title: 'בא ונראה',
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
