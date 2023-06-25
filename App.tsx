import 'expo-dev-client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LogBox} from 'react-native';

import * as Linking from 'expo-linking';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as Localization from 'expo-localization';


import {NavioApp} from '@app/navio';
import {
    configureDesignSystem,
    getNavigationTheme,
    getStatusBarBGColor,
    getStatusBarStyle,
} from '@app/utils/designSystem';
import {hydrateStores, useStores} from '@app/stores';
import {initServices, useServices} from '@app/services';
import {AppProvider} from '@app/utils/providers';
import {useAppearance} from '@app/utils/hooks';

LogBox.ignoreLogs([
    'Require',
    'Found screens with the same name nested inside one another.', // for navio in some cases
]);

// @ts-ignore
export default (): JSX.Element => {
    useAppearance();
    const [ready, setReady] = useState(false);
    const [loginCheck, setLoginCheck] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLaunch = useCallback(async () => {
        await SplashScreen.preventAutoHideAsync();

        await hydrateStores();
        configureDesignSystem();
        await initServices();

        setReady(true);
        await SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        onLaunch();
    }, [onLaunch]);
    const {api} = useServices();
    const {auth} = useStores();

    // ... rest of your code
   if(ready) {
       if(loginCheck) {
           auth.checkLoginStatus(api);
           setIsLoggedIn(auth.state === 'logged-in');
           setLoginCheck(false);
       }
       return (
           <GestureHandlerRootView style={{flex: 1}}>
               <AppProvider>
                   <StatusBar style={getStatusBarStyle()} backgroundColor={getStatusBarBGColor()}/>
                   <NavioApp
                       navigationContainerProps={{
                           theme: getNavigationTheme(),
                           linking: {
                               prefixes: [Linking.createURL('/')],
                           },
                       }}
                       root={isLoggedIn ? 'AppTabs' : 'AuthFlow'}
                   />
               </AppProvider>
           </GestureHandlerRootView>
       );
   }
};
