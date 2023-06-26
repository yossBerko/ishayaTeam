import { getDatabase, ref, onValue,update, off, DatabaseReference, push, set, get } from 'firebase/database';
import {Dispatch, useEffect, useState} from 'react';
import url from "url";
import {DateTime} from "i18n-js";
import {TaskChat, taskContent} from "@app/screens/tasks";
import {useStores} from "@app/stores";

type messages = {
    type: 'text' | 'image',
    data: string | typeof url,
    owner: string,
    date: Date,
    time: DateTime
};
export const useTasks = (buildTasks: any):[taskContent[], React.Dispatch<React.SetStateAction<taskContent[]>>] => {
    const [tasksIndex, setTasksIndex] = useState<number>();
    const [sectionsData, setSectionsData] = useState<any>({});

    useEffect(() => {
        const database = getDatabase();
        const tasksIndexRef = ref(database, 'index/tasks');

        const taskIndexListener = (snapshot: any) => {
            const index = snapshot.val();
            setTasksIndex(index);
        };

        onValue(tasksIndexRef, taskIndexListener);

        // @ts-ignore
        return () => off(tasksIndexRef, taskIndexListener);
    }, []);

    useEffect(() => {
        if (tasksIndex !== undefined) {
            const database = getDatabase();
            const allTasks:taskContent[] = [];
            const taskRefs:DatabaseReference[] = [];
            const taskListeners:any[] = [];

            for (let i = 0; i <= tasksIndex; i++) {
                const tasksRef = ref(database, `tasks/${i}`);
                taskRefs.push(tasksRef);

                const taskListener = (snapshot: any) => {
                    const data = snapshot.val();
                    const task = buildTasks(data);
                    allTasks.push(task);

                    if (allTasks.length === tasksIndex + 1) {
                        setSectionsData(allTasks);
                    }
                };

                taskListeners.push(taskListener);
                onValue(tasksRef, taskListener);
            }

            return () => {
                taskRefs.forEach((tasksRef, i) => {
                    off(tasksRef, taskListeners[i]);
                });
            };
        }
    }, [tasksIndex]);

    return [sectionsData, setSectionsData];
}

export function listenToTask(id: number, setTaskContent:Dispatch<React.SetStateAction<taskContent>>) {
    const database = getDatabase();
    const dbRef = ref(database, `tasks/${id}`);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setTaskContent(data);
    });
}
export function listenToClient(id: string, setClintContent:Dispatch<React.SetStateAction<string>>) {
    const database = getDatabase();
    const dbRef = ref(database, `users/clients/${id}`);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setClintContent(data);
    });
}
/*export const getTasksIndex = (setTasksIndex: any) => {
    const database = getDatabase();
    const tasksIndexRef = ref(database, 'index/tasks');
    onValue(tasksIndexRef, (snapshot) => {
        const index = snapshot.val();
        setTasksIndex(index);
    });
}
export const getTasks = (tasksIndex: any, setSectionsData: any, SectionsData: any, buildTasks: any) => {
    const database = getDatabase();
    const allTasks: { id: number; title: string; task?: string | undefined; location?: string | undefined; images?: [(string | undefined)?] | undefined; date: Date; deadline: string; organsStatus: string; workStatus: string; client: string; worker?: string | undefined; messages?: [(messages | undefined)?] | undefined; onPress: PureFunc; }[] | { title: string; task: string; location: string; date: Date; deadline: string; organsStatus: string; workStatus: string; client: string; worker: string; onPress: () => void; }[] = [];

    for (let i = 0; i <= tasksIndex; i++) {
        const tasksRef = ref(database, `tasks/${i}`);
        onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            const task = buildTasks(data);
            allTasks.push(task);
            let updatedSectionsData = {...SectionsData};
            updatedSectionsData['בביצוע'].content = allTasks;
            setSectionsData(updatedSectionsData);
        });
    }
}*/
export const changeTaskStatus = (taskIndex: number | undefined, status: string | undefined) => {
    const database = getDatabase();
    const tasksRef = ref(database);
    const updates:any = {};
    updates[`/tasks/${taskIndex}/workStatus`] = status;
    console.log(updates);
    console.log(status);
    return update(tasksRef, updates);
}


// Function to handle sending of message



// Function to handle sending of message
    export const sendTaskMessage = (type: 'text' | 'image' ,message:string, taskId:string | undefined, name:string, image:string) => {
        const database = getDatabase();
        const messagesRef = ref(database,`tasks/${taskId}/messages`);
        const newMessageRef = push(messagesRef);

        return set(newMessageRef,{
            owner: name,
            ownerImage: image, // Replace with your logic for image URL
            data: message,
            type: type, // Since we are sending text
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),

        });
    };

export const getUserDetails = async (userEmail: string | null) => {
    console.log('getUserDetails');
    if (userEmail) {
        const username = userEmail.substring(0, userEmail.indexOf('@'));
        const database = getDatabase();
        const dbRef = ref(database, `users/workers/${username}`);
        let userDetails: any = null;
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            userDetails = snapshot.val();
            console.log(`1--${userDetails}`);
        }
        console.log(`2--${userDetails}`);
        return userDetails;
    }
}


/*export const getUserDetails = (setUserDetails:any, userEmail:string | null) => {
    console.log('getUserDetails');
    //get user email end Extracts from it the username in English (extracts the email address up to @)
    if(userEmail) {
        const username = userEmail.substring(0, userEmail.indexOf('@'));
        const database = getDatabase();
        const dbRef = ref(database, `users/workers/${username}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            return setUserDetails = data;
        });
    }
}*/
