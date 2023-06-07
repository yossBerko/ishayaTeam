import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as eva from '@eva-design/eva';
import { BottomNavigation, BottomNavigationTab, Layout, Text, ApplicationProvider} from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const UsersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>USERS</Text>
    </Layout>
);

const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>ORDERS</Text>
    </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='USERS'/>
        <BottomNavigationTab title='ORDERS'/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Users' component={UsersScreen}/>
        <Screen name='Orders' component={OrdersScreen}/>
    </Navigator>
);

export const AppNavigator = () => (
<ApplicationProvider theme={eva.light}>
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
</ApplicationProvider>

);