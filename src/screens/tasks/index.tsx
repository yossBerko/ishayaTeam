import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, Colors, Switch} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import {Bounceable} from 'rn-bounceable';
import {If} from '@kanzitelli/if-component';


import {useStores} from '@app/stores';
import {useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {Row} from '@app/components/row';
import {IconComponent} from '@app/components/icon';
import {AvatarCom} from '@app/components/Avatar'
import {StatusChip, DeadlineChip} from '@app/components/Chip'
import {Section} from '@app/components/section';


import {getDatabase, ref, onValue, get, off, DatabaseReference, DataSnapshot} from "firebase/database";
import {DateTime} from "i18n-js";
import * as url from "url";
import {buildTasks} from "@app/screens/tasks/TaskBuilder";
import {useNavigation} from "@react-navigation/native";
import {HeaderLogoutButton} from "@app/components/button";


export type TaskChat = {
    data: string;
    owner: string;
    ownerImage: string;
    time: string;
    type: 'text' | 'image';
};

export type taskContent = {
    id: number,
    title: string,
    task?: string,
    location?: string,
    images?: string[],
    date: string,
    deadline: string,
    organsStatus: string,
    workStatus: string,
    client?: string,
    clientImage?: string,
    worker?: string,
    messages?: { [key: string]: TaskChat },
};


export const tasks: React.FC = observer(() => {
    //modifiers:
    useAppearance();
    const {navio} = useServices();
    const navigation = useNavigation();
    const [tasksIndex, setTasksIndex] = useState<number>();
    const [sectionsData, setSectionsData] = useState<taskContent[]>([]);

    //methods:
    useEffect(() => {
        const database = getDatabase();
        const tasksIndexRef = ref(database, 'index/tasks');

        const taskIndexListener = (snapshot: DataSnapshot) => {
            const index = snapshot.val();
            setTasksIndex(index);
        };

        onValue(tasksIndexRef, taskIndexListener);

        // @ts-ignore
        return () => off(tasksIndexRef, taskIndexListener);
    }, []);

    useEffect(() => {
        if (tasksIndex !== undefined) {
            const database = getDatabase();
            const allTasks: taskContent[] = [];
            const taskRefs: DatabaseReference[] = [];
            const taskListeners: any[] = [];

            for (let i = 0; i <= tasksIndex; i++) {
                const tasksRef = ref(database, `tasks/${i}`);
                taskRefs.push(tasksRef);

                const taskListener = (snapshot: any) => {
                    const data = snapshot.val();
                    const task = buildTasks(data);
                    allTasks.push(task);

                    if (allTasks.length === tasksIndex + 1) {
                        setSectionsData(allTasks);
                    }
                };

                taskListeners.push(taskListener);
                onValue(tasksRef, taskListener);
            }

            return () => {
                taskRefs.forEach((tasksRef, i) => {
                    off(tasksRef, taskListeners[i]);
                });
            };
        }
    }, [tasksIndex]);

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


    function tasks(): JSX.Element[]{
        const tasks: JSX.Element[] = [];
        const database = getDatabase();
        if (tasksIndex !== undefined) {
            for(let i = 0; i <= tasksIndex; i++){
                const tasksRef = ref(database, `tasks/${i}`);
                let task: taskContent;
                onValue(tasksRef, (snapshot: any) => {
                    const data = snapshot.val();
                    task = buildTasks(data);
                    tasks.push(
                        <View key={task.title} marginV-s1>
                            <Bounceable onPress={() => showTask(task)}>
                                <View bg-bg2Color padding-s1 br30 marginL-s3 marginR-s3>
                                    <Row flex>
                                        <View flex marginH-s3 center>
                                            <Text text60R textColor style={{textAlign: 'right'}}>
                                                {task.title}
                                            </Text>
                                            {If({
                                                _: !!task.location,
                                                _then: (
                                                    <Row>
                                                        <Text text70 grey20 style={{textAlign: 'right'}}>
                                                            {task.location}
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
                                                    label={task.organsStatus}/>
                                                <DeadlineChip
                                                    label={task.deadline}/>
                                            </Row>
                                        </View>
                                        <View marginH-s3>
                                            <AvatarCom
                                                source={{uri: task.clientImage}}
                                                title={'משימה מ'}
                                                label={task.client}
                                                size={100}
                                            />
                                        </View>
                                    </Row>
                                </View>
                            </Bounceable>
                        </View>
                    );
                });
            }
        }
        return tasks;
    }
    const Sections =
        useMemo(tasks, [tasks, tasksIndex]);

    return (
        <View flex bg-bgColor>
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
