import React, {useEffect, useMemo, useState} from 'react';
import {NativeSyntheticEvent, ScrollView, TextInputKeyPressEventData} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text, Colors, Image, TextField} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';

import {useStores} from '@app/stores';
import {useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {BButton} from '@app/components/button';

export type Props = {
    type?: 'push';
};

export const AuthLogin: NavioScreen<Props> = observer(({type = 'push'}) => {
    useAppearance(); // for Dark Mode
    const {t, navio, api} = useServices();
    const {auth} = useStores();

    // State
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');


    // Start
    useEffect(() => {
        configureUI();
    }, []);
    useEffect(() => {
        console.log("Password after update: ", password);
    }, [password]);


    // API Methods
    const login = async () => {
        setLoading(true);
        console.log(`name: ${name} ; password: ${password}`);

        try {
            console.log(`name: ${name} ; password: ${password}`);
            const response = await api.auth.login(name, password, auth); // Provide email and password

            // @ts-ignore
            if (response.status === 'success') {
                // marking that we are logged in

                // navigating to main app
                navio.setRoot('tabs', 'AppTabs');
            } else {
                // Handle error
                // @ts-ignore
                console.log(response.status);
            }
        } catch (e) {
            // handle error
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    // Methods
    const configureUI = () => {
    };

    const setEmail = (v: string) => auth.set('email', v);

    return useMemo(
        () => (
            <View flex bg-bgColor>
                <ScrollView contentInsetAdjustmentBehavior="always">
                    <View>
                        <View centerH paddingH-s3 paddingV-s10>
                            <Image source={require('@app/../assets/loginLogo.png')} resizeMode={'contain'}
                                   style={{width: '100%', height: 200}}/>
                        </View>
                        <View flex centerH marginT-30>
                            <Text text50>בא נתחיל לעבוד!</Text>

                            <Text grey30 marginT-4>
                                הכנס את שם העובד וסיסמא
                            </Text>
                        </View>

                        <View marginT-s1 centerH paddingB-250>
                            <View
                                paddingH-s4
                                marginV-s10
                                style={{width: 300, borderWidth: 1, borderColor: Colors.grey50, borderRadius: 12}}
                            >
                                <View paddingH-s3 marginV-s4>

                                    <TextField

                                        floatingPlaceholder
                                        floatingPlaceholderStyle={{textAlign: 'right'}}
                                        placeholder={'שם העובד'}
                                        onChangeText={setName}
                                        keyboardType="ascii-capable"
                                        style={{textAlign: 'right'}}
                                    />
                                </View>

                                <View centerH>
                                    <View height={1} bg-grey50 style={{width: '100%'}}/>
                                </View>

                                <View paddingH-s3 paddingV-s2 marginV-s4>
                                    <TextField
                                        floatingPlaceholder
                                        floatingPlaceholderStyle={{textAlign: 'right'}}
                                        placeholder={'סיסמא'}
                                        onChangeText={setPassword}
                                        keyboardType="visible-password"
                                        secureTextEntry
                                        style={{textAlign: 'right'}}
                                    />
                                </View>
                            </View>

                            <BButton label={loading ? 'מתחבר ...' : 'התחבר'} onPress={login} />

                        </View>
                    </View>
                </ScrollView>
            </View>
        ),
        [password, name, loading],
    );

});
AuthLogin.options = props => ({
    title: `התחברות`,
    textAlign: 'right'
});
