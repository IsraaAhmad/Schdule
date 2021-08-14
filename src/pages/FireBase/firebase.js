import firebase from 'firebase'
import "firebase/firestore"

const  firebaseConfig = {
  apiKey: "AIzaSyAWhbx7qK2YzHg6A8Ril2y82z1VepM8zco",
  authDomain: "graduationproject-f27fe.firebaseapp.com",
  projectId: "graduationproject-f27fe",
  storageBucket: "graduationproject-f27fe.appspot.com",
  messagingSenderId: "575626207690",
  appId: "1:575626207690:web:4a4aad243dbd2fa8e7ef33",
  measurementId: "G-ZCH6YN1KD8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 

  export default firebase;