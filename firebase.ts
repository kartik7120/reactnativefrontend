// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6jrMuHArxeTYT4ikxSPJ87jPbEfUkA9E",
    authDomain: "reactnativesonginternassign.firebaseapp.com",
    projectId: "reactnativesonginternassign",
    storageBucket: "reactnativesonginternassign.appspot.com",
    messagingSenderId: "882201215826",
    appId: "1:882201215826:web:7882bbf2175474afdaf08b",
    measurementId: "G-DHL475QY4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);