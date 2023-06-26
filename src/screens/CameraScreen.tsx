import {NavioScreen} from "rn-navio";
import {observer} from "mobx-react";
import {useEffect, useRef, useState} from "react";
import {Camera, CameraType} from "expo-camera";
import {Text, TouchableOpacity, View, Dialog, DialogDirections, Colors, Card} from 'react-native-ui-lib';
import * as Permissions from 'expo-permissions';
import {sendTaskMessage} from "@app/services/realTimeDB";
import {useNavigation, useRoute} from '@react-navigation/native';
import {taskContent} from "@app/screens/tasks";
import {useServices} from "@app/services";
import {useStores} from "@app/stores";
import {ImageComponent} from "@app/components/ImageComponent";
import {IconComponent} from "@app/components/icon";
import {Image} from 'expo-image';
import {Row} from "@app/components/row";
import {navio} from "@app/navio";


export type Params = {
    type?: 'push' | 'show';
    taskId?: string;
};

export const CameraScreen: NavioScreen = observer(({}) => {
    const {params: _p} = useRoute(); // this is how to get passed params with navio.push('Screen', params)
    const navigation = useNavigation();
    const params = _p as Params; // use as params?.type
    const {auth, ui} = useStores();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState(CameraType.back);
    const [showDialog, setShowDialog] = useState(false);
    const [data, setData] = useState<any>(`${auth.image}`);
    const camRef = useRef<Camera>(null);
    useEffect(() => {
        configureUI();
    }, []);

    useEffect(() => {
        (async () => {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);
    const configureUI = () => {
        navigation.setOptions({title: 'שלח תמונה'})
    }

    const takePicture = async () => {
        if (!hasPermission) {
            alert("מצטערים, אין לנו הרשאה לגשת למצלמה שלך");
            return;
        }
        if (camRef.current) {
            const data = await camRef.current.takePictureAsync();
            await setData(data.uri);
            // handle the picture data, save it to local storage and upload it to firebase by using sendTaskMessage(type: 'text' | 'image' ,message:string, taskId:string, name:string, image:string) => void, and Then navigate back to the chat screen.
            setShowDialog(true);


        }
    };

    const approvalEndSend = () => {

        return (
            <Dialog
                useSafeArea
                key="approvalEndSend"
                visible={showDialog}
                height="70%"
                width="90%"
                onDismiss={() => setShowDialog(false)}

            >
                <Card
                    key="approvalEndSend"
                    useSafeArea
                    height="100%"
                    width="100%"
                    borderRadius={20}
                    enableShadow
                    style={{backgroundColor: Colors.grey60}}
                >
                    <Text
                        style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10, color: 'black'}}
                    >
                        האם אתה בטוח שברצונך לשלוח את התמונה?
                    </Text>

                    <View flex center>
                        <Image
                            source={{uri: data}}
                            style={{width: 300, height: 300}}
                        />
                        <Row flex center>
                            <View
                                style={{marginRight: 30, marginLeft: 20}}
                            >
                                <IconComponent
                                    name="close-circle-sharp"
                                    size={40}
                                    color={Colors.red30}
                                    onPress={() => {
                                        setShowDialog(false);
                                    }}
                                />
                            </View>
                            <View
                                style={{marginRight: 30, marginLeft: 20}}
                            >
                            <IconComponent
                                name="save"
                                size={40}
                                color={Colors.green30}
                                onPress={() => {
                                    setShowDialog(false);
                                    sendImage(data);
                                }}
                            />
                            </View>

                        </Row>
                    </View>
                </Card>
            </Dialog>
        );
    }

    const sendImage = (data: any) => {
        const taskId = params.taskId;
        console.log(params);
        const name = auth.name;
        const image = auth.image;
        sendTaskMessage('image', data, taskId, name, image);
        navio.goBack();

    }

    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 1}} type={type} ref={camRef}>
                <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', alignSelf:'center'}}>
                    <TouchableOpacity style={{flex: 0, alignSelf: 'flex-end', alignContent: 'center'}}
                                      onPress={takePicture}
                    >
                        {approvalEndSend()}
                        <IconComponent name={'scan-circle'} size={80} color={Colors.white}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
});
