<script setup lang="ts">
const { user } = useUserSession();

const { data, status } = useFetch("/api/getRecentLinks", {
  query: { user: user.value?.id },
  watch: [user],
});
</script>

<template>
  <pre>{{ data }}</pre>
</template>
