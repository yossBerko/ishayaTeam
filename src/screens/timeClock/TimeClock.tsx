import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';
import {useAppearance} from '@app/utils/hooks';
import {useStores} from '@app/stores';
import {getDatabase, ref, onValue, update, off, DatabaseReference, push, set, get} from 'firebase/database';
import {Image} from 'expo-image';
import {ClockBox} from "@app/screens/timeClock/clockBox";

export const TimeClock: NavioScreen = observer(({}) => {
            useAppearance();
            const navigation = useNavigation();
            const {ui, auth} = useStores();

            const [workingStatus, setWorkingStatus] = useState(false);
            const [restStatus, setRestStatus] = useState(false);
            const [atHomeStatus, setAtHomeStatus] = useState(true);

            useEffect(() => {
                const db = getDatabase();
                const username = auth.email.substring(0, auth.email.indexOf('@'));
                const dbRef = ref(db, 'users/workers/' + username + '/status');
                onValue(dbRef, (snapshot) => {
                        const data = snapshot.val();
                        if (data === 'working') {
                            setWorkingStatus(true);
                            setRestStatus(false);
                            setAtHomeStatus(false);
                        } else if (data === 'rest') {
                            setWorkingStatus(false);
                            setRestStatus(true);
                            setAtHomeStatus(false);
                        } else if (data === 'atHome') {
                            setWorkingStatus(false);
                            setRestStatus(false);
                            setAtHomeStatus(true);
                        }
                    }
                );
                return () => {
                    off(dbRef);
                };
            }, []);

            // Start
            useEffect(() => {
                navigation.setOptions({title: 'שעון נוכחות'});
            }, []);

            const clockStatus = () => {
                if (workingStatus) {
                    return <ClockBox
                        imageSource={require('./../../../assets/iconWorkerWork.png')}
                        title={'בעבודה'}
                        titleColor={(ui.appearance === 'dark')?Colors.green20 : Colors.green60}
                        BGColor={(ui.appearance === 'dark')?Colors.green60 : Colors.green20}
                        labelButton1={'צא להפסקה'}
                        labelButton2={'דיווח יציאה'}
                        statusSetToButton1={'rest'}
                        statusSetToButton2={'atHome'}
                        iconButton1={require('./../../../assets/icons/coffee.png')}
                        iconButton2={require('./../../../assets/icons/logout.png')}
                    />
                }
                else if (restStatus) {
                    return <ClockBox
                        imageSource={require('./../../../assets/iconWorkerRest.png')}
                        title={'בהפסקה'}
                        titleColor={(ui.appearance === 'dark')?Colors.yellow20 : Colors.yellow60}
                        BGColor={(ui.appearance === 'dark')?Colors.yellow60 : Colors.yellow20}
                        labelButton1={'חזור לעבודה'}
                        labelButton2={'דיווח יציאה'}
                        statusSetToButton1={'working'}
                        statusSetToButton2={'atHome'}
                        iconButton1={require('./../../../assets/icons/log-in.png')}
                        iconButton2={require('./../../../assets/icons/logout.png')}
                    />
                    }
                else if (atHomeStatus) {
                    return <ClockBox
                        imageSource={require('./../../../assets/iconWorkerHome.png')}
                        title={'בבית'}
                        titleColor={(ui.appearance === 'dark')?Colors.red20 : Colors.red60}
                        BGColor={(ui.appearance === 'dark')?Colors.red60 : Colors.red20}
                        labelButton1={'דיווח כניסה'}
                        statusSetToButton1={'working'}
                        iconButton1={require('./../../../assets/icons/log-in.png')}
                    />
                        }
            }

            console.log('working');
            return (
                <View flex bg-bgColor>
                    <ScrollView contentInsetAdjustmentBehavior="always"
                                style={{backgroundColor:  (ui.appearance === 'dark')? Colors.black : Colors.white}}>
                        {clockStatus()}
                    </ScrollView>
                </View>
            );

        }
    )
;

