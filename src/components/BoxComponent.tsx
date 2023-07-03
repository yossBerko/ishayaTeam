import React from 'react';
import {Text, View, Colors} from 'react-native-ui-lib';
import {Row} from "@app/components/row";
import {IconComponent} from "@app/components/icon";

type BoxProps = {
    title: string,
    iconName: any,
    color: string,
    value?: string | undefined
    bg: string
    children?: React.ReactNode;
}

export const BoxComponent = ({title, iconName, color, value, bg, children}:BoxProps) => {
    return (
        <View
            style={{borderRadius: 10, borderWidth: 1, borderColor: color, padding: 10, backgroundColor: bg}}
            padding-s2
            marginR-s1
            flex
        >
            <Row right>
                <Text
                    style={{textAlign: 'right', color: color}}
                    text60
                    dark10
                    margin-s2
                >
                    {title}
                </Text>
                <IconComponent name={iconName} size={30} color={color}/>
            </Row>
            <Text
                style={{textAlign: 'center'}}
                text70
            >
                {(children)? children : (value)? value : ('')}
            </Text>
        </View>
    );
}
