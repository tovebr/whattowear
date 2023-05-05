// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { collection, initializeFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDxjCK_tOtSk9T3UwlL5h0mQE_ZQW7poRE',
  authDomain: 'whattowear-59d58.firebaseapp.com',
  projectId: 'whattowear-59d58',
  storageBucket: 'whattowear-59d58.appspot.com',
  messagingSenderId: '828765512299',
  appId: '1:828765512299:web:3dffd8e08d955892f0c72e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
