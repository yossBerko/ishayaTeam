import React, { useState } from 'react';
import { NativeBaseProvider, Box, VStack, Button } from 'native-base';
import SelectWorker from './SelectWorker';
import Password from './Password';

export default function LoginForm() {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Selected Employee:', selectedEmployee);
        console.log('Password:', password);
        // Perform login or authentication logic here
    };

    return (
        <NativeBaseProvider>
            <Box
                safeArea
                p="2"
                py="8"
                px="8"
                width="80%" // Set the width to 80% of the screen
                alignSelf="center" // Center align the box horizontally
                bg="white.500"
                borderWidth={1}
                borderColor="cyan.500"
                borderRadius="md"
                shadow={2}
            >
                <VStack space={3} mt="5">
                    <SelectWorker onSelect={setSelectedEmployee} />
                    <Password onEnter={setPassword} />
                    <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
                        כניסה
                    </Button>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
