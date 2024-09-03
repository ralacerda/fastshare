<script setup lang="ts">
const route = useRoute();

const shortID = route.params.shortID as string;

const { data, error } = await useFetch("/api/getLink", {
  params: {
    shortID,
  },
});

if (error.value) {
  console.error(error.value);
}

if (data.value?.url) {
  navigateTo(data.value.url, { external: true, redirectCode: 302 });
}
</script>

<template>
  <div v-if="error">{{ error }}</div>
</template>
