import React, {useEffect, useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {
    Avatar,
    Colors,
    Text,
    View,
} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {taskContent} from "@app/screens/tasks/index";
import {ScrollView} from "react-native-gesture-handler";
import {Row} from "@app/components/row";
import {IconComponent} from "@app/components/icon";
import {changeTaskStatus, listenToTask} from "@app/services/realTimeDB";
import {getDatabase, onValue, ref} from "firebase/database";
import {If} from "@kanzitelli/if-component";
import {ImageComponent} from "@app/components/ImageComponent";
import {BoxComponent} from "@app/components/BoxComponent";
import {WorkStatusPiker} from "@app/components/PickerComponent";
import {ClientCardComponent, ClientProps} from "@app/components/CardComponent";
import {AvatarCom} from "@app/components/Avatar";
import {useStores} from "@app/stores";
import {TaskChatComponent} from "@app/components/TaskChat";

export type Params = {
    type?: 'push' | 'show';
    content?: taskContent;
};

export const task: NavioScreen = observer(({}) => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const {params: _p} = useRoute(); // this is how to get passed params with navio.push('Screen', params)
    const params = _p as Params; // use as params?.type
    const {t, navio} = useServices();
    // @ts-ignore
    const [taskContent, setTaskContent] = React.useState<taskContent>(params.content);
    const [clintContent, setClintContent] = React.useState<ClientProps>(
        {name: '', phone: '', image: '', clientTitle: ''}
    );

    // const {t, navio} = useServices();
    const {ui} = useStores();


    // Start
    useEffect(() => {
        configureUI();
    }, []);
    useEffect(() => {
        if (params.content?.id) {
            listenToTask(params.content?.id, setTaskContent);
        }
        if (params.content?.client) {
            const db = getDatabase();
            const dbRef = ref(db, 'users/clients/' + params.content?.client);
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                setClintContent(data);
            });
        }
    }, [params.content?.id, params.content?.client]);


    const configureUI = () => {
        navigation.setOptions({title: params.content?.title})
    }


    return (
        <View flex bg-bgColor>
            <ScrollView contentInsetAdjustmentBehavior="always">
                <View
                    style={{borderRadius: 10, borderWidth: 1, borderColor: Colors.grey50, padding: 10}}
                    bg-bg2Color
                    padding-s2
                    flex
                    margin-s2
                >
                    <Text
                        style={{textAlign: 'right'}}
                        text60
                        dark10
                        marginB-s2

                    >
                        אז מה לעשות?
                    </Text>
                    <Text style={{textAlign: 'right'}}>{taskContent.task}</Text>
                    {If({
                        _: !!taskContent.images?.length,
                        _then: () => (
                            <ImageComponent images={taskContent.images}/>

                        ),
                    })}

                </View>

                <Row margin-s2>
                    <BoxComponent
                        title='דד-ליין'
                        iconName='md-timer-outline'
                        color={(ui.appearanceStr === 'Dark') ? Colors.red80 : Colors.red10}
                        value={taskContent.deadline}
                        bg={(ui.appearanceStr === 'Dark') ? Colors.red10 : Colors.red80}
                    />

                    <BoxComponent
                        title='איפה?'
                        iconName='location'
                        color={(ui.appearanceStr === 'Dark') ? Colors.purple80 : Colors.purple10}
                        value={taskContent.location}
                        bg={(ui.appearanceStr === 'Dark') ? Colors.purple20 : Colors.purple80}
                    />

                </Row>
                <View
                    paddingT-s5
                    paddingR-s5
                    flex

                >
                    <Text
                        style={{textAlign: 'right'}}
                        text60
                        dark10
                    >סטטוס עבודה:</Text>

                    <WorkStatusPiker
                        value={taskContent.workStatus}
                        taskId={taskContent.id}
                    />
                </View>
                <ClientCardComponent
                    name={clintContent.name}
                    phone={clintContent.phone}
                    image={clintContent.image}
                    clientTitle={clintContent.clientTitle}

                />
                <View
                    style={{borderRadius: 10, borderWidth: 1, borderColor: Colors.blue60, padding: 10}}
                    bg-bg2Color
                    padding-s2
                    flex
                    margin-s2
                >
                    <Text
                        style={{textAlign: 'right'}}
                        text60
                        dark10
                        color={Colors.blue40}
                        marginB-s2
                        >
                        צ'אט המשימה
                    </Text>
                            <TaskChatComponent messages={taskContent.messages} taskId={`${taskContent.id}`}/>
                </View>






            </ScrollView>
        </View>
    );
});


/*
    let selectedColor;
                <ChipsInput
                    placeholder={'Placeholder'}
                    chips={[{label: 'Falcon 9'}, {label: 'Enterprise'}, {label: 'Challenger', borderRadius: 0}]}
                />
                <ColorPalette
                    colors={['transparent', Colors.green30, Colors.yellow30, Colors.red30]}
                    value={selectedColor}
                    onValueChange={() => console.log('value changed')}
                />
                <SegmentedControl segments={[{label: '1st'}, {label: '2nd'}]}/>
                <WheelPicker
                    items={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]}
                    initialValue={'yes'}
                    onChange={() => console.log('changed')}
                />
                <FloatingButton visible={true}  button={{
                    label: 'Approve'
                }}/>
                <Dash vertical color={Colors.grey20} gap={20} length={40} thickness={150}/>
                <Gradient color={Colors.green30} numberOfSteps={4}/>
 */
