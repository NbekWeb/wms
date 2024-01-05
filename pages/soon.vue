<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

init()

function init() {
  const firebaseConfig = {
    apiKey: "AIzaSyBc-JOccf4hE-MqKjmirSRO5jS9A0CnxsU",
    authDomain: "carmarket-1a77b.firebaseapp.com",
    projectId: "carmarket-1a77b",
    storageBucket: "carmarket-1a77b.appspot.com",
    messagingSenderId: "964160393945",
    appId: "1:964160393945:web:a0266c0921241127bce4c8",
    measurementId: "G-Q6QL6YHD59"
  };

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}


function test() {
  const provider = new GoogleAuthProvider()

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const t = await auth.currentUser?.getIdToken()

      console.log(t)

      console.log("template")
      console.log(credential)
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      console.log("Error in getAdditionalUserInfo")
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// function test() {
//   const provider = new GoogleAuthProvider();

//   const cred = GoogleAuthProvider.credentialFromResult(token)
// }

</script>

<template>
    <div>
        soon


        <button @click="test">test</button>
    </div>
</template>