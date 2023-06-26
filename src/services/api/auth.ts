import {sleep} from '../../../exampels/help';
import {Auth$Login$Response} from '@app/utils/types/api';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth} from "../../../firebaseConfig";
import {useStores} from "@app/stores";
import {ApiService} from "@app/services/api/index";
import {AuthStore} from "@app/stores/auth";
import {getUserDetails} from "@app/services/realTimeDB";
import {useState} from "react";



export class AuthApi {
    userDetails: {
        name: string;
        image: string;
        phone: string;
        email: string;
        status: string;
        password: string;
        isAdmin: string;
    };

    constructor() {
        this.userDetails = {
            "name": "",
            "image": "",
            "phone": "",
            "email": "",
            "status": "",
            "password": "",
            "isAdmin": ""
        };
    }

    async IsLogin(auth: AuthStore) {
        console.log("api log in");
        try {
            console.log("api log in11");
            let user = firebaseAuth.currentUser;
            if (auth.state === 'logged-in'){

                if(!user){
                    console.log("api log in22");
                    const userCredential = await signInWithEmailAndPassword(firebaseAuth, auth.email, auth.password);
                    user = userCredential.user;
                    console.log(user.providerData);
                }
            }

            console.log(user);
            if (user) {
                console.log("fireBase");
                return {
                    status: 'success',
                    data: {
                        'some-session-info?': user,
                    },
                };
            }
            else {
                return {
                    status: 'error'
                };
            }
        } catch (error) {
            const errorCode = error;
            const errorMessage = error;
            // ... (display error message somehow)
            return {
                status: 'error',
                message: errorMessage,
            };
        }
    }

    async login(email: string, password: string, auth: any) {
        console.log(email+password);
        try {
            console.log('נכנס לעשות לוג אין')
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;

            if (user) {
                console.log('bcljhbljhblkjhblkjh');
                console.log('המשתמש אושר בfirebse');
                this.userDetails = await getUserDetails(user.email);
                auth.set('state', 'logged-in');
                console.log(user.email);
                auth.set('email', `${user.email}`);
                auth.set('name',`${user.displayName}`);
                auth.set('password', password);
                auth.set('image',`${this.userDetails.image}`);
                return {
                    status: 'success',
                    data: {
                        'some-session-info?': user,
                    },
                };
            }
        } catch (error) {
            console.log('המשתמש לא אושר בfirebse');
            console.log(error);
            const errorCode = error;
            const errorMessage = error;
            // ... (display error message somehow)
            return {
                status: 'error',
                message: errorMessage,
            };
        }
    }

    /*    async login(email: string, password: string, auth: AuthStore) {
            const [userDetails, setUserDetails] = useState({
                "name": "",
                "image": "",
                "phone": "",
                "email": "",
                "status": "",
                "password": "",
                "isAdmin": ""
            });
            console.log(email+password);
            try {
                console.log('נכנס לעשות לוג אין')
                const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
                const user = userCredential.user;


                if (user) {
                    console.log('bcljhbljhblkjhblkjh');
                    console.log('המשתמש אושר בfirebse');
                    getUserDetails(setUserDetails, user.email);
                    auth.set('state', 'logged-in');
                    console.log(user.email);
                    auth.set('email', `${user.email}`);
                    auth.set('name',`${user.displayName}`);
                    auth.set('password', password);
                    auth.set('image',`${userDetails.image}`);
                    return {
                        status: 'success',
                        data: {
                            'some-session-info?': user,
                        },
                    };
                }
            } catch (error) {
                console.log('המשתמש לא אושר בfirebse');
                console.log(error);
                const errorCode = error;
                const errorMessage = error;
                // ... (display error message somehow)
                return {
                    status: 'error',
                    message: errorMessage,
                };
            }
        }*/
    async logout() {
        try {
            await firebaseAuth.signOut();
            return {
                status: 'success',
            };
        } catch (error) {
            const errorCode = error;
            const errorMessage = error;
            // ... (display error message somehow)
            return {
                status: 'error',
                message: errorMessage,
            };
        }
    }
}
