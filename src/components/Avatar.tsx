import React, {useMemo} from 'react';
import {View, Colors, AvatarProps, Avatar, ViewProps, Text} from 'react-native-ui-lib';



type AvatProps = {
    source: AvatarProps['source'];
    badgeProps?: AvatarProps['badgeProps'];
    badgePosition?: AvatarProps['badgePosition'];
    title?: string;
    label?: string
    size?: number

};

export const AvatarCom: React.FC<AvatProps> = ({
                                                   source,
                                                   badgeProps,
                                                   badgePosition,
                                                   title,
                                                   label,
                                                   size,
                                               }: AvatProps) => {
    console.log(`source: ${source}`)
    const AvatarCom = useMemo(
        () => (
            <View>
                <Avatar source={source} badgeProps={badgeProps} badgePosition={badgePosition}
                        label={label}
                backgroundColor= {Colors.$backgroundWarningLight}
                labelColor= {Colors.$textMajor}
                ribbonLabel={title}
                        size={size}
                />
            </View>
        ),
        [source, badgeProps, badgePosition],
    );
    return AvatarCom;

};

//https://wix.github.io/react-native-ui-lib/docs/components/media/Avatar#source for more opshens
