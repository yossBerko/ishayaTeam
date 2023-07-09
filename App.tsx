import 'expo-dev-client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LogBox} from 'react-native';

import * as Linking from 'expo-linking';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as Localization from 'expo-localization';


import {IsAdmin, NavioApp} from '@app/navio';
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
export default (): JSX.Element | null => {
    useAppearance();
    const [ready, setReady] = useState(false);
    const [loginCheck, setLoginCheck] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState('false');

    const onLaunch = useCallback(async () => {
        await SplashScreen.preventAutoHideAsync();
        await hydrateStores();
        await configureDesignSystem();
        await initServices();
        setReady(true);
        await SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        onLaunch();
    }, [onLaunch]);

    const {api} = useServices();
    const {auth} = useStores();

    useEffect(() => {
        // @ts-ignore
        setIsAdmin(auth.isAdmin);
    }, [auth.isAdmin]);

    useEffect(() => {
        if (auth.state === 'logged-in') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [auth.state]);

    // Check login status once after initial render
    useEffect(() => {
        if (loginCheck) {
            auth.checkLoginStatus(api);
            setLoginCheck(false);
        }
    }, [loginCheck, auth, api]);

    if (ready && !loginCheck) {
        console.log("isAdmin Value: ", isAdmin, " Type: ", typeof isAdmin);
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
                        root={(isAdmin as unknown as string) === 'true' ? 'AppAdminTabs' : (isLoggedIn ? 'AppTabs' : 'AuthFlow')}
                    />
                </AppProvider>
            </GestureHandlerRootView>
        );
    }

    // Maybe render a loading indicator or null while waiting for readiness
    return null;
};
