<script setup lang="ts">
import type { Link } from "~~/drizzle/schema";

defineProps<{ links: Link[] }>();
</script>

<template>
  <div>
    <h2>Recent links</h2>
    <ul>
      <li v-for="link in links" :key="link.id">
        <div class="code-link">
          <NuxtLink :href="link.code">{{ composeLink(link.code) }}</NuxtLink>
        </div>
        ·
        <h3 class="link-title">{{ link.title }}</h3>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

li {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.link-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 400px;
}

.code-link {
  overflow: hidden;
}
</style>
