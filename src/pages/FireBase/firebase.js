import firebase from 'firebase'
import "firebase/firestore"

const  firebaseConfig = {
    apiKey: "AIzaSyDlwzy0BBHJaqnpDN4CTbNMRY-n-s3VA64",
    authDomain: "chat-5f177.firebaseapp.com",
    projectId: "chat-5f177",
    storageBucket: "chat-5f177.appspot.com",
    messagingSenderId: "902522902383",
    appId: "1:902522902383:web:48c90fd02b4e5d73daba9a",
    measurementId: "G-BBY0WH8FZS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 

  export default firebase;