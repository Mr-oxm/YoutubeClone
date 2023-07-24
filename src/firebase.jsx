import {initializeApp} from 'firebase/app';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE,
    authDomain: "y-clone-aacc0.firebaseapp.com",
    projectId: "y-clone-aacc0",
    storageBucket: "y-clone-aacc0.appspot.com",
    messagingSenderId: "1091283990586",
    appId: "1:1091283990586:web:d976c5339b6c16e1b71d03",
    measurementId: "G-2RTCN5BT99"
};


const fireApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireApp);
export default fireApp;



