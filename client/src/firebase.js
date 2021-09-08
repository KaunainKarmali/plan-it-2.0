import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBwt_zfv2zIiCPyFNvZaAYiFYkKR6G4PHQ",
  authDomain: "plan-it-2.firebaseapp.com",
  projectId: "plan-it-2",
  storageBucket: "plan-it-2.appspot.com",
  messagingSenderId: "615929451281",
  appId: "1:615929451281:web:fd04ec4ba14823c899f2b0",
  measurementId: "G-GB8VMKSHKM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
