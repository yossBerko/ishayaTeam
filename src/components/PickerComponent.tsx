import React, {useState} from 'react';
import {Button, Card, Colors, Dialog, Picker, Text, View} from 'react-native-ui-lib';
import DateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {Platform, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {
    clientPikerProps,
    locationPikerProps,
    OrgansStatusProps,
    TimePikerProps, workerPikerProps,
    WorkStatusPikerProps
} from "@app/utils/types/pikerTypes";
import {AvatarCom} from "@app/components/Avatar";
import {clients} from "@app/utils/types/databaseTypes";
import {useStores} from "@app/stores";

const statusStyles = {
    'בהמתנה': {
        color: Colors.yellow5,
        textAlign: 'center',
        margin: 10,
        borderWidth: 3,
        borderColor: Colors.grey50,
        borderRadius: 20,
        padding: 4,
        backgroundColor: Colors.yellow80,
        fontSize: 20
    },
    'בביצוע': {
        color: Colors.cyan10,
        textAlign: 'center',
        margin: 10,
        borderWidth: 3,
        borderColor: Colors.grey50,
        borderRadius: 20,
        padding: 4,
        backgroundColor: Colors.cyan80,
        fontSize: 20
    },
    'הושלם': {
        color: Colors.green5,
        textAlign: 'center',
        margin: 10,
        borderWidth: 3,
        borderColor: Colors.grey50,
        borderRadius: 20,
        padding: 4,
        backgroundColor: Colors.green80,
        fontSize: 20
    },
    'בעיה': {
        color: Colors.red5,
        textAlign: 'center',
        margin: 10,
        borderWidth: 3,
        borderColor: Colors.grey50,
        borderRadius: 20,
        padding: 4,
        backgroundColor: Colors.red80,
        fontSize: 20
    },
    'locationPiker': {
        fontSize: 20,
        textAlign: 'center',
    },
    'נמוכה': {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.green5,
        backgroundColor: Colors.green80,
    },
    'בינונית': {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.yellow5,
        backgroundColor: Colors.yellow80,
    },
    'גבוהה': {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.orange5,
        backgroundColor: Colors.orange80,
    },
    'קריטית': {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.red5,
        backgroundColor: Colors.red80,
    }
};


export const TimePiker = ({date, setDate, type}: TimePikerProps) => {
    const [change, setChange] = React.useState(false);
    if (Platform.OS === 'ios') {
        return (<DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={type}
            display="default"
            onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
            }}
        />)
    } else if (Platform.OS === 'android') return (
        <TouchableOpacity
            onPress={() => {
                DateTimePickerAndroid.open({
                    value: date,
                    onChange: (event, selectedDate) => {
                        setChange(true);
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                    },
                    mode: type,
                    is24Hour: true,
                    positiveButton: {label: 'בחר'},
                    negativeButton: {label: 'בטל'},
                });
            }
            }
        >
            <View margin-s4>
                {(type === 'time') ?
                    (
                        <Text style={{fontSize: 20, textAlign: 'center'}}>{date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}</Text>
                    ) :
                    (
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center'
                        }}>{(change) ? date.toLocaleDateString('en-US') : 'היום'}</Text>)}
            </View>
        </TouchableOpacity>
    );
}

export const LocationPiker = ({value, setLocation}: locationPikerProps) => {
    return (
        <Picker
            value={value}
            enableModalBlur={false}
            onChange={(item: locationPikerProps['value']) => {
                setLocation(item);
                console.log(value);
            }}
            topBarProps={{title: 'מיקום'}}
            /*@ts-ignore*/
            style={statusStyles['locationPiker']}
            marginT-s4
            marginL-s3
            useSafeArea
            showSearch
            searchStyle={{
                color: Colors.grey50,
                textAlign: 'right',

            }}
            searchPlaceholder={'חפש'}
            searchPlaceholderStyle={{
                color: Colors.red5
            }}
        >
            <Picker.Item key={'בחר מיקום'} value={'בחר מיקום'} label={'בחר מיקום'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'כניסה ראשית'} value={'כניסה ראשית'} label={'כניסה ראשית'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'פינקוס'} value={'פינקוס'} label={'פינקוס'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'אורנים'} value={'אורנים'} label={'אורנים'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'תצוגות'} value={'תצוגות'} label={'תצוגות'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'אשכולות'} value={'אשכולות'} label={'אשכולות'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'מדרגות נשר'} value={'מדרגות נשר'} label={'מדרגות נשר'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'מסדרון הקשתות'} value={'מסדרון הקשתות'} label={'מסדרון הקשתות'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'מסדרון אורנים'} value={'מסדרון אורנים'} label={'מסדרון אורנים'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'טדי'} value={'טדי'} label={'טדי'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'טרקלין טדי'} value={'טרקלין טדי'} label={'טרקלין טדי'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'דולצ׳ין'} value={'דולצ׳ין'} label={'דולצ׳ין'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'גשר דולצ׳ין'} value={'גשר דולצ׳ין'} label={'גשר דולצ׳ין'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
            <Picker.Item key={'מטבח טדי'} value={'מטבח טדי'} label={'מטבח טדי'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['locationPiker']}/>
        </Picker>
    );
}
export const WorkStatusPiker = ({value, setTaskStatus, onchange}: WorkStatusPikerProps) => {
    return (
        <Picker
            value={value}
            enableModalBlur={false}
            onChange={(item: WorkStatusPikerProps['value']) => {
                setTaskStatus(item);
                console.log(`piker: ${value}`);
                if (onchange)
                    onchange(item);
            }}
            topBarProps={{title: 'סטטוס ביצוע'}}
            /*@ts-ignore*/
            style={statusStyles[value]}
            mode={'dialog'}
            placeholder={'בחר סטטוס'}
            placeholderTextColor={Colors.grey50}
            hideUnderline
            marginT-s2
            useSafeArea
        >

            <Picker.Item key={'בהמתנה'} value={'בהמתנה'} label={'בהמתנה'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['בהמתנה']}/>
            <Picker.Item key={'בביצוע'} value={'בביצוע'} label={'בביצוע'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['בביצוע']}/>
            <Picker.Item key={'הושלם'} value={'הושלם'} label={'הושלם'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['הושלם']}/>
            <Picker.Item key={'בעיה'} value={'בעיה'} label={'בעיה'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['בעיה']}/>
        </Picker>
    );
};

export const OrgansStatusPiker = ({organsStatus, setOrgansStatus}: OrgansStatusProps) => {
    return (
        <Picker
            value={organsStatus}
            enableModalBlur={false}
            onChange={(item: OrgansStatusProps['organsStatus']) => {
                setOrgansStatus(item);
                console.log(`piker: ${organsStatus}`);
            }}
            topBarProps={{title: 'סטטוס דחיפות'}}
            /*@ts-ignore*/
            style={statusStyles[organsStatus]}
            mode={'dialog'}
            placeholder={'בחר סטטוס'}
            placeholderTextColor={Colors.grey50}
            hideUnderline
            marginT-s2
            useSafeArea
        >
            <Picker.Item key={'נמוכה'} value={'נמוכה'} label={'נמוכה'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['נמוכה']}/>
            <Picker.Item key={'בינונית'} value={'בינונית'} label={'בינונית'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['בינונית']}/>
            <Picker.Item key={'גבוהה'} value={'גבוהה'} label={'גבוהה'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['גבוהה']}/>
            <Picker.Item key={'קריטית'} value={'קריטית'} label={'קריטית'}
                /*@ts-ignore*/
                         labelStyle={statusStyles['קריטית']}/>

        </Picker>
    )
}

export const ClientPiker: React.FC<clientPikerProps | workerPikerProps> = ({value, values, setValues, onchange, title}: clientPikerProps | workerPikerProps) => {
    const {ui} = useStores();
    const styles = StyleSheet.create({
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: (ui.appearanceStr === 'Dark') ? Colors.grey60 : Colors.grey20,
            textAlign: 'right',
            margin: 10,
            flex: 1,

        },
        name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: (ui.appearanceStr === 'Dark') ? Colors.grey60 : Colors.grey20,
            textAlign: 'right',
            margin: 15,

        },
        pikerBox: {
            backgroundColor: (ui.appearanceStr === 'Dark') ? Colors.grey20 : Colors.grey50,
            borderRadius: 10,
            paddingBottom: 30,
        },
        divider: {
            borderBottomColor: (ui.appearanceStr === 'Dark') ? Colors.grey40 : Colors.grey30,
            borderBottomWidth: 1,
        },
        clientBox: {
            margin: 10,
        },
        pikerOutFocus: {
            height: 20,
            width: 20,
            backgroundColor: Colors.grey900,
            borderRadius: 10,
            marginTop: 10,
        }
    })
    const [dialogVisible, setDialogVisible] = useState(false);


    const dialogPicker = () => {
        return (
            <Dialog
                visible={dialogVisible}
                onDismiss={() => {
                    setDialogVisible(false);
                }}
                height="70%"
                width="90%"
                useSafeArea
            >
                <ScrollView>
                <Card
                    key="clientPiker"
                    useSafeArea
                    height="100%"
                    width="100%"
                    borderRadius={20}
                    enableShadow
                >
                    {values && Object.entries(values).map(([id, client], index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setDialogVisible(false);
                                    setValues(client);
                                    if (onchange)
                                        onchange(client);
                                }}
                            >
                                <View style={styles.divider}/>
                                <View
                                    key={id}
                                    style={styles.clientBox}
                                    row
                                    center
                                >
                                    <Text
                                        style={styles.name}
                                    >
                                        {client.name}
                                    </Text>
                                    <AvatarCom
                                        source={{uri: client.image}}
                                        size={60}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </Card>
                </ScrollView>
            </Dialog>
        )
    }

    return (
        <TouchableOpacity
            onPress={() => {
                setDialogVisible(true);
            }}
        >
            <View
                style={styles.pikerBox}
            >
                <Text
                    style={styles.title}
                >
                    {title}
                </Text>
                <View style={styles.divider}/>
                {dialogPicker()}
                <View  row center marginT-s3>
                    <Text
                        style={styles.name}
                    >
                        {value.name}
                    </Text>
                    <AvatarCom
                        source={{uri: value.image}}
                        size={60}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )


}



