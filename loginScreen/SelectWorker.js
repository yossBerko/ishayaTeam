import React, { useEffect, useState } from 'react';
import { FormControl, Select, CheckIcon, ScrollView } from 'native-base';
import getWorkers from './getWorkers';

export default function SelectWorker({ onSelect }) {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetchWorkers();
    }, []);

    async function fetchWorkers() {
        try {
            const fetchedWorkers = await getWorkers();
            setWorkers(fetchedWorkers);
        } catch (error) {
            console.error(error);
        }
    }

    const handleWorkerSelect = (value) => {
        onSelect(value);
    };

    return (
        <FormControl>
            <FormControl.Label alignSelf="flex-end">שם העובד</FormControl.Label>
            <ScrollView>
                <Select
                    px="20"
                    alignItems="flex-end"
                    flex={1}
                    mx="1"
                    accessibilityLabel="בחר עובד"
                    placeholder="אנא בחר עובד"
                    _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="3" />,
                    }}
                    mt={1}
                    onValueChange={handleWorkerSelect}
                >
                    {workers.map((worker, index) => (
                        <Select.Item key={index} label={worker} value={worker} />
                    ))}
                </Select>
            </ScrollView>
        </FormControl>
    );
}
