import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBeX9XOuCLtAN_gJ6CteEZa01FhabzfRmY",
  authDomain: "fkz-finance.firebaseapp.com",
  databaseURL: "https://fkz-finance.firebaseio.com",
  projectId: "fkz-finance",
  storageBucket: "fkz-finance.appspot.com",
  messagingSenderId: "415113607653",
  appId: "1:415113607653:web:e9f76a56b942ae37"
};

export default firebase.initializeApp(firebaseConfig);
