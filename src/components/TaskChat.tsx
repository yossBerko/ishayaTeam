import React, {useState} from 'react';
import {
    Colors, Fader, Text, View, Constants,
    Assets,
    Spacings,
    Keyboard,
    TextField,
    Button,
    Switch
} from 'react-native-ui-lib';
import {useStores} from "@app/stores";
import {AvatarCom} from "@app/components/Avatar";
import position = Fader.position;
import {If} from "@kanzitelli/if-component";
import {Image} from "expo-image";
import {ImageComponent} from "@app/components/ImageComponent";
//import {TaskChat} from "@app/screens/tasks";
import {Camera, CameraType, CameraCapturedPicture} from 'expo-camera';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {sendTaskMessage} from "@app/services/api/realTimeDB";
import {TaskChat} from "@app/screens/tasks/index";
import {useServices} from "@app/services";
import {IconComponent} from "@app/components/icon";

type TaskChatProps = {
    messages: { [key: string]: TaskChat } | undefined
    taskId: string
}

export const TaskChatComponent = ({messages, taskId}: TaskChatProps) => {
    const {auth, ui} = useStores();
    const {t, navio} = useServices();

    const [message, setMessage] = useState<string>('');

    const handleCameraIconPress = () => {
        navio.N.navigate('tasksStack', {
            screen: 'CameraScreen',
            params: {taskId},
        });
        console.log(taskId);
    };

    return (
        <KeyboardAwareScrollView style={{flex: 1}}>
            <View>
                {messages && Object.entries(messages).map(([id, message], index) => (
                    <View
                        key={id}
                        style={{flexDirection: message.owner === auth.name ? 'row' : 'row-reverse', marginTop: 10}}
                        marginH-s2
                    >
                        <AvatarCom source={{uri: message.ownerImage}} size={60}/>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.grey20 : 'white',
                                borderRadius: 10,
                                padding: 10
                            }}>
                            <Text
                                text70
                                dark10
                                style={{
                                    textAlign: 'right',
                                    color: (ui.appearanceStr === 'Dark') ? Colors.green60 : Colors.green40,
                                    fontWeight: 'bold'
                                }}
                            >
                                {message.owner}
                            </Text>
                            {message.type === 'text' ? (
                                <View>
                                    <Text
                                        text70
                                        dark10
                                        style={{textAlign: 'right'}}
                                    >
                                        {message.data}
                                    </Text>
                                </View>
                            ) : null}

                            {message.type === 'image' ? (
                                <View>
                                    <ImageComponent
                                        images={[message.data]}
                                    />
                                </View>
                            ) : null}
                            <Text
                                text70
                                dark10
                                style={{
                                    color: (ui.appearanceStr === 'Dark') ? Colors.grey40 : Colors.grey40,
                                    marginTop: 5,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                {message.time}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
            <View row centerV paddingH-10>
                <TouchableOpacity onPress={handleCameraIconPress}>
                    <IconComponent name={'camera'} size={30} />
                </TouchableOpacity>
                <TextField
                    flex
                    text70
                    placeholder="Type your message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <Button label="Send" link onPress={() => sendTaskMessage('text', message, taskId, auth.name, auth.image)} />
            </View>
        </KeyboardAwareScrollView>


    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
    },
    text: {
        size: 18,
        color: 'white',
    }
});
