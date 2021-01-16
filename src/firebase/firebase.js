import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyClYkg5EbDG73a7vKDUe2DcTWig951V4S4",
  authDomain: "decarbonate-3e825.firebaseapp.com",
  databaseURL: "https://decarbonate-3e825-default-rtdb.firebaseio.com",
  projectId: "decarbonate-3e825",
  storageBucket: "decarbonate-3e825.appspot.com",
  messagingSenderId: "1089877211268",
  appId: "1:1089877211268:web:a21de7fe30423676482ad1",
  measurementId: "G-K1E0JTK2RH"
});
export const auth = app.auth();
export default app;
