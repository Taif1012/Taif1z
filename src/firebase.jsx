import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA0_jQ1fFFJj66Mw-7LjU6TEYLMRdUNgJg",
  authDomain: "subscription-management-a16e7.firebaseapp.com",
  databaseURL: "https://subscription-management-a16e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "subscription-management-a16e7",
  storageBucket: "subscription-management-a16e7.firebasestorage.app",
  messagingSenderId: "549838967817",
  appId: "1:549838967817:web:6d158a5e4d4bf43f8394d8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };