import React from 'react';
import {Card, Colors, Text, View, Image} from 'react-native-ui-lib';
import {Row} from "@app/components/row";
import {IconComponent} from "@app/components/icon";
import {useStores} from "@app/stores";

export type ClientProps = {
    name: string,
    image: string,
    phone: string,
    clientTitle: string
}

export const ClientCardComponent = ({name, image, phone, clientTitle}: ClientProps) => {
    const {ui} = useStores();
    return (
        <Card
            borderRadius={10}
            margin-s2
            padding-s2
            enableBlur={false}
            enableShadow={true}

            backgroundColor={(ui.appearanceStr === 'Dark') ? Colors.grey10 : Colors.grey60}
            style={{borderTopLeftRadius: 30,
                borderTopRightRadius: 1}}
            flex
            activeOpacity={0}
        >

            <Image source={{uri: image}} height={160} width={"100%"} style={{borderTopLeftRadius: 20}}/>


            <View padding-s2>
                <Row right>
                    <Text text50 dark10 style={{textAlign: 'right'}}>
                        {name}
                    </Text>
                    <Text text50 dark10 style={{textAlign: 'right', color: (ui.appearanceStr === 'Dark') ? Colors.purple60 : Colors.purple20}}>
                        {'מזמין המשימה: '}
                    </Text>
                </Row>
                <Row right>
                    <Row right flex>
                        <Text text70 dark10>
                            {phone}
                        </Text>
                        <IconComponent name={'phone-portrait'} size={30} color={Colors.$iconDefault}/>
                    </Row>
                    <Text text70 dark10 style={{color: Colors.purple40}}>{'      '}</Text>
                    <Row right flex>
                        <Text text70 dark10 style={{color: Colors.yellow20}}>
                            {clientTitle}
                        </Text>
                        <IconComponent name={'man'} size={30} color={Colors.yellow20}/>
                    </Row>
                </Row>
            </View>


        </Card>
    );
}
