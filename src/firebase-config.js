import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpaPmr6VJ_xjbdjxv8hSRDe2pgA7iLfVA",
  authDomain: "learner-support-portal-e48b1.firebaseapp.com",
  databaseURL: "https://learner-support-portal-e48b1-default-rtdb.firebaseio.com",
  projectId: "learner-support-portal-e48b1",
  storageBucket: "learner-support-portal-e48b1.firebasestorage.app",
  messagingSenderId: "763161187027",
  appId: "1:763161187027:web:77d66f3f13bb15cd6f7a26"
};

export const app = initializeApp(firebaseConfig);