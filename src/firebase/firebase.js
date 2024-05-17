import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDEsF5ih0KWHX6A1g4IPqRwgn6cDR2n4BM",
    authDomain: "propitch-4839e.firebaseapp.com",
    projectId: "propitch-4839e",
    storageBucket: "propitch-4839e.appspot.com",
    messagingSenderId: "752008266741",
    appId: "1:752008266741:web:df4dbcbffc3eaabfc716bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    auth,
    storage,
    firestore,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    collection,
    addDoc,
    query,
    signOut,
    onAuthStateChanged,
    getAuth,
    where,
    getDocs,
  };