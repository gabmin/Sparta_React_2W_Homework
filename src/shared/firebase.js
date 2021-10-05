import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv0lDvYKzPKj3Nl1TtJZVxuFOCTdJZEG0",
  authDomain: "mymagazine-f30bf.firebaseapp.com",
  projectId: "mymagazine-f30bf",
  storageBucket: "mymagazine-f30bf.appspot.com",
  messagingSenderId: "225443574518",
  appId: "1:225443574518:web:75f802e0ae2fa5299c72d7",
  measurementId: "G-PSZR4H7BZF",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, apiKey, firestore };
