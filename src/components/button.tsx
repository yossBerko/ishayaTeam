import React from 'react';
import {View, Text, MarginModifiers, Modifiers, ViewProps, Colors} from 'react-native-ui-lib';
import {Bounceable} from 'rn-bounceable';
import {IconComponent, IconName} from "@app/components/icon";
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useShowAuthFlow} from "@app/services/LoginFlow";
import {Row} from "@app/components/row";
import {useStores} from "@app/stores";


type IconProps = {
    name: IconName;
    size?: number;
    color?: string;
    viewProps?: ViewProps;
    onPress?: PureFunc;
    bounceable?: boolean;
};

type Props = Modifiers.MarginModifiers &
    Modifiers.FlexModifiers & {
    label?: string;
    onPress?: PureFunc;
    size?: 'medium' | 'small';
};

export const BButton: React.FC<Props> = ({label, onPress, size = 'medium', ...modifiers}) => {
    const textSize = size === 'medium' ? {text65M: true} : {text70: true};

    return (
        <View {...modifiers}>
            <Bounceable onPress={onPress}>
                <View center bg-primary padding-s4 br40>
                    <Text _white {...textSize}>
                        {label}
                    </Text>
                </View>
            </Bounceable>
        </View>
    );
};

export const HeaderButton: React.FC<Props> = ({label, onPress, ...modifiers}) => {
    return (
        <View {...modifiers}>
            <Bounceable onPress={onPress}>
                <View center padding-s1 marginH-s1>
                    <Text text65M primary>
                        {label}
                    </Text>
                </View>
            </Bounceable>
        </View>
    );
};

export const HeaderIconButton: React.FC<IconProps> = ({
                                                          name,
                                                          size,
                                                          color,
                                                          viewProps,
                                                          onPress,
                                                          bounceable = false,
                                                          ...modifiers
                                                      }: IconProps) => {
    return (
        <View {...modifiers}>
            <Bounceable onPress={onPress}>
                <View>
                    <IconComponent name={name} size={size} color={color}/>
                </View>
            </Bounceable>
        </View>
    );
};

export const IconButton: React.FC<IconProps> = ({
                                                        name,
                                                        size,
                                                        color,
                                                        viewProps,
                                                        onPress,
                                                        bounceable = false,
                                                        ...modifiers
                                                    }: IconProps) => {
    return (
        <View {...modifiers}>
            <Bounceable onPress={onPress}>
                <View>
                    <IconComponent name={name} size={size} color={color}/>
                </View>
            </Bounceable>
        </View>
    );
}


export function HeaderLogoutButton({navigation}: any) {
    const showAuthFlow = useShowAuthFlow();
    const {auth} = useStores();
    return (
        <View>
            <Bounceable onPress={showAuthFlow}>
                <View>
                    <Row>
                        <Text text80M color={Colors.blue40}> התנתק</Text>
                        <IconComponent name={'log-out-outline'} size={20} color={Colors.blue40}/>
                        <Text> </Text>
                        <Text text80M color={Colors.blue60}>{auth.name}</Text>

                    </Row>
                </View>
            </Bounceable>
        </View>
    );
}


