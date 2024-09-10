<script setup lang="ts">
import type { Link } from "~~/drizzle/schema";

defineProps<{ links: Link[] }>();
</script>

<template>
  <div>
    <h2>Recent links</h2>
    <ul>
      <li v-for="link in links" :key="link.id">
        <a :href="link.url">{{ link.url }}</a>
        {{ link.createAt }}
      </li>
    </ul>
  </div>
</template>
