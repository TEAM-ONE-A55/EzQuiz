import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD81Qd1UtWJ4yUTrLMtq1V8LY7VhCDS4-s",
  authDomain: "ezquiz-99cdb.firebaseapp.com",
  projectId: "ezquiz-99cdb",
  storageBucket: "ezquiz-99cdb.appspot.com",
  messagingSenderId: "226295104069",
  appId: "1:226295104069:web:93e5225fe9b0276620592c",
  databaseURL: "https://ezquiz-99cdb-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
