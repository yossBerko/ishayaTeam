import { getDatabase, ref, child, get } from "firebase/database";

export default function getWorkers() {
    return new Promise((resolve, reject) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "users/workers/"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const workers = snapshot.val();
                    resolve(workers);
                } else {
                    console.log("No data available");
                    resolve([]);
                }
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
