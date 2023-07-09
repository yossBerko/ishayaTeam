import React, {useMemo} from 'react';
import {View, Colors, ChipProps, Avatar, ViewProps, Text, Chip} from 'react-native-ui-lib';

import {IconComponent, IconName} from "@app/components/icon";
import {If} from "@kanzitelli/if-component";


// @ts-ignore
export const StatusChip: React.FC<ChipProps> = (props) => {
    let StatusChip;
    switch (props.label) {
        case 'קריטית': {
            StatusChip = useMemo(
                () => (
                    <View padding-s1>
                        <Chip
                            label={"קריטי"}
                            labelStyle={{
                                color: Colors.black,
                                textAlign: 'center'
                            }}
                            rightElement={
                                <View>
                                    <IconComponent name={'flag'} color={Colors.black} size={20}/>
                                </View>
                            }
                            containerStyle={{borderColor: Colors.black}}
                            backgroundColor={Colors.red30}
                            size={30}
                            padding-s2
                        />
                    </View>
                ),
                [],
            );
        }
        break;
        case 'גבוהה': {
            StatusChip = useMemo(
                () => (
                    <View padding-s2>
                        <Chip
                            label={"גבוה"}
                            labelStyle={{
                                color: Colors.red20,
                                textAlign: 'center'
                            }}
                            containerStyle={{borderColor: Colors.red20}}
                            backgroundColor={Colors.red80}
                            size={30}
                            padding-s2
                        />
                    </View>
                ),
                [],
            );
        }
        break;
        case 'בינונית': {
            StatusChip = useMemo(
                () => (
                    <View padding-s2>
                        <Chip
                            label={"בינוני"}
                            labelStyle={{
                                color: Colors.yellow20,
                                textAlign: 'center'
                            }}
                            containerStyle={{borderColor: Colors.yellow20}}
                            backgroundColor={Colors.yellow80}
                            size={30}
                            padding-s2
                        />
                    </View>
                ),
                [],
            );
        }
        break;
        case 'נמוכה': {
            StatusChip = useMemo(
                () => (
                    <View padding-s2>
                        <Chip
                            label={"נמוך"}
                            labelStyle={{
                                color: Colors.green20,
                                textAlign: 'center'
                            }}
                            containerStyle={{borderColor: Colors.green20}}
                            backgroundColor={Colors.green80}
                            size={30}
                            padding-s2
                        />
                    </View>
                ),
                [],
            );
        }
    }
    return StatusChip;
};


export const DeadlineChip: React.FC<ChipProps> = (props) => {
    const DeadlineChip = useMemo(
        () => (
            <View padding-s2>
                <Chip
                    label={props.label}
                    onPress={() => console.log('pressed')}
                    labelStyle={{
                        color: Colors.purple20,
                        textAlign: 'left'
                    }}

                    containerStyle={{borderColor: Colors.purple20}}
                    backgroundColor={Colors.purple80}
                    rightElement={
                    <View paddingL-s1>
                        <IconComponent name={'time-outline'} color={Colors.purple20} size={20}/>
                    </View>
                    }
                    size={30}
                    padding-s2
                />
            </View>
        ),
        [],
    );
    return DeadlineChip;

};

//https://wix.github.io/react-native-ui-lib/docs/components/media/Avatar#source for more opshens
