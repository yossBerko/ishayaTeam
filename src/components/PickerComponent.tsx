import React from 'react';
import {Colors, Picker} from 'react-native-ui-lib';
import {changeTaskStatus} from "@app/services/api/realTimeDB";

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
};
type WorkStatusPikerProps = {
    value: 'בהמתנה' | 'בביצוע' | 'הושלם' | 'בעיה' | string,
    taskId: number
}
export const WorkStatusPiker = ({value, taskId}:WorkStatusPikerProps) => {
    return (
        <Picker
            value={value}
            enableModalBlur={false}
            onChange={(item: string | undefined) => {
                changeTaskStatus(taskId, item);
                console.log(value);
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
