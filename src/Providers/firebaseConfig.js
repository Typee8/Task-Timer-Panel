import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDclNshCz2ZUDr1Ii8MQU6guDwgip2hfl0",
  authDomain: "task-timer-panel-dev.firebaseapp.com",
  databaseURL:
    "https://task-timer-panel-dev-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-timer-panel-dev",
  storageBucket: "task-timer-panel-dev.firebasestorage.app",
  messagingSenderId: "1002077863035",
  appId: "1:1002077863035:web:cd917aa8bff1fa422976de",
};

const app = initializeApp(firebaseConfig);

export default app;
