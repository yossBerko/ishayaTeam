import { getDatabase, ref, onValue,update, off, DatabaseReference, push, set, get } from 'firebase/database';
import React, {Dispatch, useEffect, useState} from 'react';
import url from "url";
import {DateTime} from "i18n-js";
import {TaskChat, taskContent} from "@app/utils/types/databaseTypes";
import {useStores} from "@app/stores";

type messages = {
    type: 'text' | 'image',
    data: string | typeof url,
    owner: string,
    date: Date,
    time: DateTime
};

export const pushTask = (task: taskContent) => {
    const database = getDatabase();
    const taskRef = push(ref(database, 'tasks'));
    task.id = taskRef.key;
    console.log(task);
    set(taskRef, task);


}
export const useTasks = (buildTasks: any):[taskContent[], React.Dispatch<React.SetStateAction<taskContent[]>>] => {
    const [tasksIndex, setTasksIndex] = useState<number>();
    const [tasksIndexList, setTasksIndexList] = useState<string[]>();
    const [sectionsData, setSectionsData] = useState<any>({});

    useEffect(() => {
        const database = getDatabase();
        const tasksIdsListRef = ref(database, 'tasks');

        const tasksIdsListListener = (snapshot: any) => {
            let ids:string[]= [];
            snapshot.forEach((id) => {
                if(id){


                ids.push(id.key);
                console.log(id.key);
                }
            });
            console.error(ids);
            setTasksIndexList(ids);
        }
        onValue(tasksIdsListRef, tasksIdsListListener);
        return () =>
            // @ts-ignore
            off(tasksIdsListRef, tasksIdsListListener);
    }, []);
    useEffect(() => {
        const database = getDatabase();
        const tasksIndexRef = ref(database, 'index/tasks');


        const taskIndexListener = (snapshot: any) => {
            const index = snapshot.val();
            setTasksIndex(index);
            console.log(index);
        };

        onValue(tasksIndexRef, taskIndexListener);


        return () =>
            // @ts-ignore
            off(tasksIndexRef, taskIndexListener);


    }, []);

    useEffect(() => {
        if (tasksIndex !== undefined && tasksIndexList !== undefined) {
            const database = getDatabase();
            const allTasks:taskContent[] = [];
            const taskRefs:DatabaseReference[] = [];
            const taskListeners:any[] = [];

            for (let i = 0; i <= tasksIndex; i++) {
                const tasksRef = ref(database, `tasks/${tasksIndexList[i]}`);
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
    }, [tasksIndex, tasksIndexList]);

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

export const ListenToList = async <T> (path:string, setValue: React.Dispatch<React.SetStateAction<T>>) => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setValue(data);
        console.log(data);
    });
}
