<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();
</script>

<template>
  <header>
    <h1>Fast Share</h1>

    <a v-if="!loggedIn" class="button small-button" href="/auth/google"
      >Login</a
    >
    <div class="user-area" v-else>
      <span>{{ user?.fullName }}</span>
      <button class="button small-button" @click="clear">Logout</button>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-block: 1rem;

  h1 {
    font-size: 2rem;
  }
}

.small-button {
  font-size: 0.9rem;
}

.user-area {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
