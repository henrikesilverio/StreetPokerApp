import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCFPNPPqaX4Rxuzg54DB3sCPQbJYVvrsKw",
  authDomain: "streetpokertest.firebaseapp.com",
  databaseURL: "https://streetpokertest.firebaseio.com",
  projectId: "streetpokertest",
  storageBucket: "streetpokertest.appspot.com",
  messagingSenderId: "864041662790"
});

export const db = firebase.firestore();