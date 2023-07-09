import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, Colors, Switch} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import {Bounceable} from 'rn-bounceable';
import {If} from '@kanzitelli/if-component';
import {getNavio} from '@app/navio';

import {useStores} from '@app/stores';
import {useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {Row} from '@app/components/row';
import {IconComponent} from '@app/components/icon';
import {AvatarCom} from '@app/components/Avatar'
import {StatusChip, DeadlineChip} from '@app/components/Chip'


import {getDatabase, ref, onValue, query, orderByChild, equalTo} from "firebase/database";
import {useNavigation} from "@react-navigation/native";
import {HeaderLogoutButton, IconButton} from "@app/components/button";
import {taskContent} from "@app/utils/types/databaseTypes";


export const tasks: React.FC = observer(() => {
    //modifiers:
    useAppearance();
    const {ui, auth} = useStores();
    const navio = getNavio();
    const navigation = useNavigation();
    const [allTasks, setAllTasks] = useState<any>(undefined);

    //methods:
    useEffect(() => {
        const database = getDatabase();
        const tasksRef = ref(database, `tasks`);
        const tasksQ = query(tasksRef, orderByChild('worker'), equalTo(auth.email));
        const taskListener = (snapshot: any) => {
            console.log("snapshot.val(): " + snapshot.val());
            if (snapshot.val() !== null)
                setAllTasks(snapshot.val());
            console.log("allTasks: " + allTasks);
        };
        onValue(tasksQ, taskListener);
    }, []);


    const showTask = (content: taskContent) => {
        console.log(content.workStatus);
        navio.N.navigate('tasksStack', {
            screen: 'task',
            params: {content},
        });
    }
    //start:
    useEffect(() => {
        navigation.setOptions({
            title: 'משימות',
            headerLeft: () => <HeaderLogoutButton/>,
        });
    }, []);


    function tasks(): JSX.Element[] {
        const tasks: JSX.Element[] = [];
        if (allTasks !== undefined) {
            const size = Object.keys(allTasks).length;
            const keys = Object.keys(allTasks);
            for (let i = 0; i <= size; i++) {
                const data = allTasks[keys[i]];
                if (data !== undefined) {
                    tasks.push(
                        <View key={data.title} marginV-s1>
                            <Bounceable onPress={() => showTask(data)}>
                                <View bg-bg2Color padding-s1 br30 marginL-s3 marginR-s3>
                                    <Row flex>
                                        <View flex marginH-s3 center>
                                            <Text text60R textColor style={{textAlign: 'right'}}>
                                                {data.title}
                                            </Text>
                                            {If({
                                                _: !!data.location,
                                                _then: (
                                                    <Row>
                                                        <Text text70 grey20 style={{textAlign: 'right'}}>
                                                            {data.location}
                                                        </Text>
                                                        <View padding-s1>
                                                            <IconComponent name="location-outline" size={20}
                                                                           color={Colors.grey20}/>
                                                        </View>
                                                    </Row>
                                                ),
                                            })}
                                            <Row marginH-s3>
                                                <StatusChip
                                                    label={data.organsStatus}/>
                                                <DeadlineChip
                                                    label={data.deadline}/>
                                            </Row>
                                        </View>
                                        <View marginH-s3>
                                            <AvatarCom
                                                source={{uri: data.clientImage}}
                                                title={'משימה מ'}
                                                label={data.client}
                                                size={100}
                                            />
                                        </View>
                                    </Row>
                                </View>
                            </Bounceable>
                        </View>
                    );
                }
            }
        }
        return tasks;
    }

    const Sections =
        useMemo(tasks, [tasks, allTasks, useAppearance]);

    return (
        <View flex style={
            {
                backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.black : Colors.white,
            }
        }>
            <View style={{position: 'absolute', left: 20, bottom: 20, zIndex: 1}}>
                <IconButton
                    name={'add-circle'}
                    size={80}
                    color={(ui.appearanceStr === 'Dark') ? Colors.blue60 : Colors.blue40}
                    onPress={() => navio.N.navigate('tasksStack', {screen: 'addTask'})}/>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="always">{Sections}</ScrollView>
        </View>
    );
});


/*
    <View flex marginH-s3 right>
        <Text text60R textColor>
            {content.title}
        </Text>

        {If({
            _: !!content.subtitle,
            _then: (
                <Text text70 grey20>
                    {content.subtitle}
                </Text>
            ),
        })}
    </View>
*/

/*    const showFlashList = () => navio.push('PlaygroundFlashList');
    const showExpoImage = () => navio.push('PlaygroundExpoImage');
    const showDrawerWithTabs = () => {
        Alert.alert('Uncomment related code in @app/navio.tsx and @app/screens/playground');
        // uncomment related code in navio.tsx and below
        // navio.setRoot('drawers', 'MainDrawer');
    };
    const showTabsWithDrawer = () => {
        Alert.alert('Uncomment related code in @app/navio.tsx and @app/screens/playground');
        // uncomment related code in navio.tsx and below
        // navio.setRoot('tabs', 'TabsWithDrawer');
    };*/

/*    // pushing stack will hide tabs on Product Page
    const showProductPage = () => navio.stacks.push('ProductPageStack');*/
