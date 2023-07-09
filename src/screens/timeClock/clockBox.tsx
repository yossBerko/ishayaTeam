import React, {useEffect, useState} from 'react';
import {Text, View, Colors, Button} from 'react-native-ui-lib';
import {Image} from 'expo-image';
import {useStores} from "@app/stores";
import {getDatabase, ref, set} from "firebase/database";
import {opacity} from "react-native-reanimated/lib/types/lib";
import {If} from "@kanzitelli/if-component";

export type ClockBoxProps = {
    imageSource: string;
    title: string;
    titleColor: string;
    BGColor: string;
    labelButton1: string;
    labelButton2?: string;
    iconButton1: string;
    iconButton2?: string;
    statusSetToButton1: string;
    statusSetToButton2?: string;

}

export const ClockBox: React.FC<ClockBoxProps> = ({
                                                      imageSource,
                                                      title,
                                                      titleColor,
                                                      BGColor,
                                                      statusSetToButton1,
                                                      statusSetToButton2,
                                                      iconButton1,
                                                      iconButton2,
                                                      labelButton1,
                                                      labelButton2
                                                  }: ClockBoxProps) => {
    const {ui, auth} = useStores();
    const ButtonHandler = (status: string | undefined) => {
        const db = getDatabase();
        const username = auth.email.substring(0, auth.email.indexOf('@'));
        const dbRef = ref(db, 'users/workers/' + username + '/status');
        set(dbRef, status);
    }

    return (
        <View
            bg-bg2Color
            style={{
                borderRadius: 5,
            }
            }
        >
            <Text style={{
                color: (ui.appearance === 'dark') ? Colors.blue50 : Colors.blue40,
                fontSize: 20,
                margin: 10,
                textAlign: 'center',
                fontWeight: 'bold'

            }}>סטטוס דיווח:</Text>


            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: BGColor,
                borderRadius: 20,
                padding: 10,
                marginTop: 1,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                height: 400
            }}>
                <Text style={{
                    color: titleColor,
                    fontSize: 20,
                    textAlign: 'right',
                    paddingRight: 20,
                    paddingTop: 10,
                    fontWeight: 'bold'
                }}>{title}</Text>
                <Image
                    source={imageSource}
                    style={{
                        width: '100%',
                        height: 50,
                        flex: 1,
                        resizeMode: 'contain'

                    }}/>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                    <Button
                        label={labelButton1}
                        style={{
                            backgroundColor: (ui.appearance === 'dark') ? Colors.blue50 : Colors.blue40,
                            borderRadius: 10,
                            width: '50%',
                            height: 50,
                            margin: 2,
                            opacity: 0.8

                        }}
                        iconOnRight
                        iconSource={iconButton1}
                        iconStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                            ButtonHandler(statusSetToButton1);
                        }}
                    />
                    {labelButton2 && (
                            <Button
                                label={labelButton2}
                                style={{
                                    backgroundColor: (ui.appearance === 'dark') ? Colors.blue50 : Colors.blue40,
                                    borderRadius: 10,
                                    width: '50%',
                                    height: 50,
                                    margin: 2,
                                    opacity: 0.8

                                }}
                                iconOnRight
                                iconSource={iconButton2}
                                iconStyle={{
                                    width: 30,
                                    height: 30,
                                }}
                                onPress={() => {
                                    ButtonHandler(statusSetToButton2);
                                }}
                            />
                    )}
                </View>
            </View>
        </View>
    );
}

