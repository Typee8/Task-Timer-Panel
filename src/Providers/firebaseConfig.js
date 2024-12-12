import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCf30MKY-WZqSZRrmkeU5bSLRpjzPyB-d8",
  authDomain: "task-timer-panel.firebaseapp.com",
  databaseURL:
    "https://task-timer-panel-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-timer-panel",
  storageBucket: "task-timer-panel.firebasestorage.app",
  messagingSenderId: "32657303932",
  appId: "1:32657303932:web:af2e4200dc83e8163ddcf9",
};

const app = initializeApp(firebaseConfig);

export default app;
