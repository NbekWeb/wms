<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

import { GoogleAuthProvider } from "firebase/auth";

let token = ''
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  console.log(response);
  console.log("Access Token", response);

  if (credential)
  token = credential
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

function submit() {
    const url = 'http://192.168.28.5:8081/api/cars/v1/user/login'


}

// function test() {
//   const provider = new GoogleAuthProvider();

//   const cred = GoogleAuthProvider.credentialFromResult(token)
// }

</script>

<template>
    <div>
        soon

        <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"
        >hello</GoogleSignInButton>


        <!-- <button @click="test">test</button> -->
    </div>
</template>