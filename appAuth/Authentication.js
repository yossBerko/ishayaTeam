import {
    getAuth,
    updateProfile,
    signInWithEmailAndPassword,
    updatePhoneNumber,
    signOut,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
} from "firebase/auth";

export default function Authentication() {
    let User;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            console.log(user.providerData);
            updateProfile(user, {
                displayName: "יוסי", photoURL: 'https://firebasestorage.googleapis.com/v0/b/ishayateam.appspot.com/o/Yossi_Berkowitz_A_cartoon_of_a_guy_with_long_sideburns_and_a_bi_b86f35c6-3ba5-41c6-b736-0dc732536ffa.PNG?alt=media&token=19261038-f61d-4f02-a581-22923d4f1093'
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
        } else {
            const email = 'vich770@gmail.com', password = 'q1q1q1q1';
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in
                user = userCredential.user;
                console.log(user.providerData);
                user.providerData.forEach((profile) => {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("  Provider-specific UID: " + profile.uid);
                    console.log("  Name: " + profile.displayName);
                    console.log("  Email: " + profile.email);
                    console.log("  Photo URL: " + profile.displayName);
                });
                // ...
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    });


}

/*
try {
        await updateProfile(auth.currentUser, {
            displayName: "יוסי",
        });
        // Profile updated!
    } catch (error) {
        // An error occurred
        console.log(error);
    }
    console.log(user);
 */


//TODO: signOut:
/*
    signOut(auth).then(() => {
    console.log("signOut");
}).catch((error) => {
    console.log(error);
})
 */

//TODO: update the user password:
/*
import { getAuth, updatePassword } from "firebase/auth";

const auth = getAuth();

const user = auth.currentUser;
const newPassword = getASecureRandomPassword();

updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});
 */

//TODO: Delete user password:
/*
import { getAuth, deleteUser } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
 */

//TODO: create a new user:
/*
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 */

//TODO: login user:
/*
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
 */

//TODO: setting on observer to the user state:
/*
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
 */


