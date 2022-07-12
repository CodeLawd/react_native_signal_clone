import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBjEKXrGvkMayec-vmqS3pQ_UbnC3n1K2w",
  authDomain: "signal-clone-9f8f4.firebaseapp.com",
  projectId: "signal-clone-9f8f4",
  storageBucket: "signal-clone-9f8f4.appspot.com",
  messagingSenderId: "45797685334",
  appId: "1:45797685334:web:2c9ac5b8ece649f82c63f7",
}

// // const app = initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)

// // if (firebase.apps.length === 0) {
// //   app = firebase.initializeApp(firebaseConfig)
// // } else {
// //   app = firebase.app()
// // }

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
