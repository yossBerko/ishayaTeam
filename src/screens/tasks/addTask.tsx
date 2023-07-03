import React, {useEffect, useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {
    Avatar,
    Colors,
    Text,
    View,
    TextField, Fader, Button,
} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';


import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {TaskChat, taskContent, clients, workers, client, worker} from "@app/utils/types/databaseTypes";
import {ScrollView} from "react-native-gesture-handler";
import {Row} from "@app/components/row";
import {IconComponent} from "@app/components/icon";
import {changeTaskStatus, ListenToList, listenToTask, pushTask} from "@app/services/realTimeDB";
import {getDatabase, onValue, ref} from "firebase/database";
import {If} from "@kanzitelli/if-component";
import {ImageComponent} from "@app/components/ImageComponent";
import {BoxComponent} from "@app/components/BoxComponent";
import {
    ClientPiker,
    LocationPiker,
    OrgansStatusPiker,
    TimePiker,
    WorkStatusPiker
} from "@app/components/PickerComponent";
import {ClientCardComponent, ClientProps} from "@app/components/CardComponent";
import {AvatarCom} from "@app/components/Avatar";
import {useStores} from "@app/stores";
import {TaskChatComponent} from "@app/screens/tasks/TaskChat";
import {TouchableOpacity} from "react-native";
import {locationPikerProps, OrgansStatusProps, WorkStatusPikerProps} from "@app/utils/types/pikerTypes";

export const addTask: NavioScreen = observer(({}) => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const {navio} = useServices();
    const {ui} = useStores();
    /*
        const [taskContent, setTaskContent] = React.useState<taskContent>(params.content);
        const [clintContent, setClintContent] = React.useState<ClientProps>(
            {name: '', phone: '', image: '', clientTitle: ''}
        );
    */
    const [client, setClient] = React.useState<client>(
        {
            name: 'לחץ לבחירה',
            clientTitle: ' הכל',
            image: 'https://cdn.speedsize.com/445b3f1d-fd31-4b62-b24b-5846a3ed38ac/https://d3m9l0v76dty0.cloudfront.net/system/photos/9696452/large/690781fb492d0da16849959e919356b2.webp',
            phone: ' '
        }
    );
    const [clients, setClients] = React.useState<clients>(
        {
            ' ': {
                name: ' ',
                clientTitle: ' ',
                image: ' ',
                phone: ' '
            }
        }
    );
    const [worker, setWorker] = React.useState<worker>(
        {
            name: 'לחץ לבחירה',
            image: 'https://cdn.speedsize.com/445b3f1d-fd31-4b62-b24b-5846a3ed38ac/https://d3m9l0v76dty0.cloudfront.net/system/photos/9696452/large/690781fb492d0da16849959e919356b2.webp',
            phone: ' '
        }
    );
    const [workers, setWorkers] = React.useState<workers>(
        {
            ' ': {
                name: ' ',
                image: ' ',
                phone: ' '
            }
        }
    );
    const [title, setTitle] = React.useState<string>('');
    const [task, setTask] = React.useState<string>('');
    const [images, setImages] = React.useState<string[]>([]);

    const [organsStatus, setOrgansStatus] = React.useState<OrgansStatusProps['organsStatus']>('נמוכה');
    const [workStatus, setWorkStatus] = React.useState<WorkStatusPikerProps['value']>('בהמתנה');
    const [deadline, setDeadline] = React.useState<Date>(new Date());
    const [date, setDate] = React.useState<Date>(new Date());
    const [location, setLocation] = React.useState<locationPikerProps['value']>('בחר מיקום');
    const [messages, setMessages] = React.useState<{ [key: string]: TaskChat }>({});



    // Start
    useEffect(() => {
        configureUI();
    }, []);

    useEffect(() => {
        ListenToList('users/clients', setClients);
        ListenToList('users/workers', setWorkers);
    }, []);


    const configureUI = () => {
        navigation.setOptions({title: 'הוסף משימה חדשה'})
    }

    const handleCameraPress = () => {
        navio.N.navigate('tasksStack', {
            screen: 'CameraScreen',
            params: {setImages},
        });
        console.log('handleCameraPress');
    };

    const handleAddTask = () => {
const newTask: taskContent = {
            id: '',
            title: title,
            task: task,
            images: images,
            organsStatus: organsStatus,
            workStatus: workStatus,
            deadline: date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric'
            }),
            date: date.toLocaleDateString('en-US'),
            location: location,
            client: client.name,
            worker: worker.email,
            messages: messages,
        }
        pushTask(newTask);
        navio.goBack();
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
                    <TextField
                        style={{textAlign: 'right'}}
                        text60
                        dark10
                        marginB-s2
                        preset={null}
                        label={'כותרת'}
                        labelProps={{dark10: true}}
                        placeholder={'כותרת'}
                        floatingPlaceholderStyle={{
                            textAlign: 'right',
                            color: (ui.appearanceStr === 'Dark') ? Colors.grey40 : Colors.grey20,

                        }}
                        color={(ui.appearanceStr === 'Dark') ? Colors.white : Colors.black}
                        floatingPlaceholder={true}
                        enableErrors={true}
                        validationMessage={'* על הכותרת להכיל מילה-2   '}
                        validationMessageStyle={{
                            textAlign: 'right',
                            color: Colors.red40,

                        }}
                        onChangeText={setTitle}
                        value={title}
                        containerStyle={{
                            marginBottom: 10,
                            backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.grey20 : Colors.grey60,
                            borderRadius: 5,

                        }}
                    />
                    <TextField
                        style={{textAlign: 'right'}}
                        text80
                        dark10
                        marginB-s2
                        preset={null}
                        label={'תיאור המשימה'}
                        labelProps={{dark10: true}}
                        placeholder={'תיאור המשימה'}
                        floatingPlaceholderStyle={{
                            textAlign: 'right',
                            color: (ui.appearanceStr === 'Dark') ? Colors.grey40 : Colors.grey20,

                        }}
                        color={(ui.appearanceStr === 'Dark') ? Colors.white : Colors.black}
                        floatingPlaceholder={true}
                        enableErrors={true}
                        validationMessage={'* פרט כמה שיותר   '}
                        validationMessageStyle={{
                            textAlign: 'right',
                            color: Colors.red40,

                        }}
                        onChangeText={setTask}
                        value={task}
                        containerStyle={{
                            marginBottom: 10,
                            backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.grey20 : Colors.grey60,
                            borderRadius: 5,

                        }}
                    />
                    {If({
                        _: !!images?.length,
                        _then: () => (
                            <ImageComponent images={images}/>
                        ),
                    })}

                    <TouchableOpacity
                        onPress={() => {
                            handleCameraPress();
                        }}
                    >
                        <View row spread center paddingH-s2 marginT-s2 paddingV-s3
                              style={{
                                  borderWidth: 1,
                                  borderColor: (ui.appearanceStr === 'Dark') ? Colors.grey20 : Colors.grey80,
                                  borderRadius: 20,
                                  backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.blue70 : Colors.blue70,
                                  alignSelf: 'center',
                              }}
                              width={'50%'}
                        >
                            <Text text80 dark10 color={Colors.blue20}> הוסף תמונה</Text>
                            <IconComponent
                                name={'camera'}
                                color={Colors.blue20}
                                size={30}
                            />
                        </View>
                    </TouchableOpacity>


                </View>

                <Row margin-s2>
                    <BoxComponent
                        title='דד-ליין'
                        iconName='md-timer-outline'
                        color={(ui.appearanceStr === 'Dark') ? Colors.red10 : Colors.red10}
                        bg={(ui.appearanceStr === 'Dark') ? Colors.red40 : Colors.red80}
                    >
                        <Row center flex>
                            <IconComponent name={'caret-down-circle-outline'}
                                           color={(ui.appearanceStr === 'Dark') ? Colors.red60 : Colors.red20}
                                           size={30}
                            />
                            {/*@ts-ignore*/}
                            <TimePiker date={deadline} setDate={setDeadline} type={'time'}/>
                        </Row>
                    </BoxComponent>

                    <BoxComponent
                        title='איפה?'
                        iconName='location'
                        color={(ui.appearanceStr === 'Dark') ? Colors.purple10 : Colors.purple10}
                        bg={(ui.appearanceStr === 'Dark') ? Colors.purple40 : Colors.purple80}
                    >
                        <Row center flex>
                            <IconComponent name={'caret-down-circle-outline'}
                                           color={(ui.appearanceStr === 'Dark') ? Colors.purple60 : Colors.purple20}
                                           size={30}/>
                            <LocationPiker value={location} setLocation={setLocation}/>
                        </Row>
                    </BoxComponent>

                </Row>
                <Row margin-s2>


                    <BoxComponent
                        title='רמת דחיפות'
                        iconName='fitness-sharp'
                        color={(ui.appearanceStr === 'Dark') ? Colors.violet10 : Colors.violet10}
                        bg={(ui.appearanceStr === 'Dark') ? Colors.violet40 : Colors.violet80}
                    >
                        <Row center flex>
                            <IconComponent name={'caret-down-circle-outline'}
                                           color={(ui.appearanceStr === 'Dark') ? Colors.violet60 : Colors.violet20}
                                           size={30}/>
                            <OrgansStatusPiker organsStatus={organsStatus} setOrgansStatus={setOrgansStatus}/>
                        </Row>
                    </BoxComponent>

                    <BoxComponent
                        title='תאריך'
                        iconName='calendar'
                        color={(ui.appearanceStr === 'Dark') ? Colors.blue10 : Colors.blue10}
                        bg={(ui.appearanceStr === 'Dark') ? Colors.blue40 : Colors.blue80}
                    >
                        <Row center flex>
                            <IconComponent name={'caret-down-circle-outline'}
                                           color={(ui.appearanceStr === 'Dark') ? Colors.blue60 : Colors.blue20}
                                           size={30}
                            />
                            {/*@ts-ignore*/}
                            <TimePiker date={date} setDate={setDate} type={'date'}/>
                        </Row>
                    </BoxComponent>

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
                        value={workStatus}
                        setTaskStatus={setWorkStatus}
                    />
                </View>
                <View marginB-s10 width={'90%'} style={{alignSelf: 'center', flex: 1}}>
                <ClientPiker value={client} values={clients} setValues={setClient} title={'מבקש המשימה:'}/>
                </View>
                <View marginB-s10 width={'90%'} style={{alignSelf: 'center', flex: 1}}>
                    <ClientPiker value={worker} values={workers} setValues={setWorker} title={'עובד:'}/>
                </View>

                <Button
                    margin-s2
                    label={'הוסף את המשימה'}
                    onPress={() => {
                        handleAddTask();
                    }
                    }
                    style={{
                        backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.green10 : Colors.green10,
                        borderRadius: 20,
                        alignSelf: 'center',
                    }}
                    labelStyle={{
                        color: (ui.appearanceStr === 'Dark') ? Colors.green20 : Colors.green20,
                    }}
                />


            </ScrollView>
        </View>
    );
});


