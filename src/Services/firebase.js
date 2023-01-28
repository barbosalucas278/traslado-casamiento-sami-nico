// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiUSQiO_EkdDy9olj19wpq1zwC_4HP0Yc",
    authDomain: "traslados-casamiento-sami-nico.firebaseapp.com",
    projectId: "traslados-casamiento-sami-nico",
    storageBucket: "traslados-casamiento-sami-nico.appspot.com",
    messagingSenderId: "419943827875",
    appId: "1:419943827875:web:7f3e9b2ecb4d2b63067216"
  };

// Initialize Firebase
let app = null;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth, app };