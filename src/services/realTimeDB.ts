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
    console.log('I push task!!: '+task.organsStatus);
    set(taskRef, task);


}

export function listenToTask(id: string, setTaskContent:Dispatch<React.SetStateAction<taskContent>>) {
    const database = getDatabase();
    const dbRef = ref(database, `tasks/${id}`);
    const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setTaskContent(data);
        console.log("dfdf "+data.title);
    });

    return unsubscribe;
}

export function listenToClient(id: string, setClintContent:Dispatch<React.SetStateAction<string>>) {
    const database = getDatabase();
    const dbRef = ref(database, `users/clients/${id}`);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setClintContent(data);
    });
}

export const changeTaskStatus = (taskIndex: string | null, status: string | undefined) => {
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
