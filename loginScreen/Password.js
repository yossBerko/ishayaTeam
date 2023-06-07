import React, { useState } from 'react';
import { FormControl, Stack, Input, WarningOutlineIcon, Icon, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function Password({ onEnter }) {
    let password="";
    const handlePasswordChange = (text) => {
        onEnter(text);
        password= text;
    };

    const validatePassword = () => {
        if (password.length < 6) {
            return 'על הסיסמא להכיל 6 תווים לפחות';
        }
        return '';
    };

    return (
        <FormControl isRequired>
            <Stack mx="1" flex={1} >
                <FormControl.Label alignSelf="flex-end" flex={1}>
                    סיסמא
                </FormControl.Label>
                <Input
                    px="20"
                    onChangeText={handlePasswordChange}
                    placeholder="סיסמא"
                    type="password"
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validatePassword()}
                </FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    );
}
