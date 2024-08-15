<script setup>
const { loggedIn, user, session, fetch, clear } = useUserSession();
</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user }}!</h1>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/auth/google">Login with GitHub</a>
  </div>
</template>
