// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDv38JcuLhOMVtC7y1U99aUr5flWQf-5ds',

  authDomain: 'whatsapp-clone-t1.firebaseapp.com',

  projectId: 'whatsapp-clone-t1',

  storageBucket: 'whatsapp-clone-t1.appspot.com',

  messagingSenderId: '965123022209',

  appId: '1:965123022209:web:69ba1828d11339233f1c80',

  measurementId: 'G-ELNG6M6EB4',
};

// to initialize the application with the firebase configuration
const app = initializeApp(firebaseConfig);

// initializes instance and gets database
const db = getFirestore(app);

// authentication handler
const auth = getAuth();

// for google authentication
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
