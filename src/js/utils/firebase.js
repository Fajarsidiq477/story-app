// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCpGLBzJn_zATjRnaPEZjQO9E7dJNb3IGI',
  authDomain: 'story-app-b3c43.firebaseapp.com',
  projectId: 'story-app-b3c43',
  storageBucket: 'story-app-b3c43.appspot.com',
  messagingSenderId: '666773039814',
  appId: '1:666773039814:web:4221e547d47111b9fe05c7',
  measurementId: 'G-BN16KWJJJF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
