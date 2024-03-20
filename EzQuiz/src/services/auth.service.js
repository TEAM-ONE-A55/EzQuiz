import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { auth } from "../config/firebase.config";
  
  export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  export const logoutUser = async () => {
    await signOut(auth);
  };
  