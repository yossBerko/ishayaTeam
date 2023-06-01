import { initializeApp } from "firebase/app";
import {app} from './firebaseConfig';
import { getDatabase, ref, child, get, set } from "firebase/database";


/*export function initializeDataBase(app){
    let db = getDatabase(app);
    console.log(db);
}*/
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


// Initialize Firebase



// Initialize Realtime Database and get a reference to the service
//const db = getDatabase(app);

export function writeUserData(userId, name, password, imageUrl, phone) {
    let db = getDatabase()
    set(ref(db, 'users/' + userId), {
        username: name,
        password: password,
        profile_picture : imageUrl,
        phone: phone
    });
}


//const workers=

export function getWorkers(){
    //console.log(app);
    let workers= "";
    let dbRef = ref(getDatabase()), i= 0;
    console.log(dbRef);
    while (i == 0) {
        get(child(dbRef, `users/workers/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                workers= workers+snapshot.val();
            } else {
                i= -1;
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        i++;
    }
    console.log(workers);
    return workers;
}


