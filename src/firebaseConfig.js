// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ضع هنا البيانات الخاصة بمشروعك التي حصلت عليها من موقع Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7x03ywHdN8D80vkZFZsvwyjvHOA9ioK4",
  authDomain: "mounir-mma.firebaseapp.com",
  projectId: "mounir-mma",
  storageBucket: "mounir-mma.firebasestorage.app",
  messagingSenderId: "10243811164",
  appId: "1:10243811164:web:796c3c20d759b76d808399",
  
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// ⚠️ تأكد من وجود كلمة export في هذا السطر تحديداً لكي يراها المترجم:
export const db = getFirestore(app);