import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBk2Gu-vcdFwTBnhMIjcTNCoBTRogf25Gw",
  authDomain: "ezquiz-b7ac8.firebaseapp.com",
  projectId: "ezquiz-b7ac8",
  storageBucket: "ezquiz-b7ac8.appspot.com",
  messagingSenderId: "592464378395",
  appId: "1:592464378395:web:81c54f5d885f0938f956be",
  databaseURL: "https://ezquiz-b7ac8-default-rtdb.europe-west1.firebasedatabase.app/"
  
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
