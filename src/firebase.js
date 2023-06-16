import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbDVsG4LKacG2Hgtrf37y6ERNhVHmq7Xg",
  authDomain: "drive-clone-0.firebaseapp.com",
  projectId: "drive-clone-0",
  storageBucket: "drive-clone-0.appspot.com",
  messagingSenderId: "51476624640",
  appId: "1:51476624640:web:c1b91de04a0799881a2fe5",
  measurementId: "G-W2Q2CCCCZR"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

  export  {db,storage,auth,provider}