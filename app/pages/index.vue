<script setup lang="ts">
import * as v from "valibot";
import { useClipboard } from "@vueuse/core";

const runtimeConfig = useRuntimeConfig();
const UrlSchema = v.pipe(v.string(), v.url());

const url = ref("");
const validUrl = ref(true);

const shortenID = ref("");

const shortenLink = computed(() => {
  return shortenID.value
    ? runtimeConfig.public.hostURL + "/" + shortenID.value
    : "";
});

const error = ref("");

const { copy } = useClipboard();

function validateUrl() {
  if (!url.value) return;
  const err = v.safeParse(UrlSchema, url.value);
  validUrl.value = err.success;
  return err.success;
}

async function submit() {
  if (!validateUrl()) return;
  error.value = "";
  const { shortID } = await $fetch("/api/createLink", {
    method: "POST",
    body: {
      url: url.value,
    },
    onResponseError: async ({ response }) => {
      error.value = response._data.message;
    },
    onResponse: () => {
      url.value = "";
    },
  });

  shortenID.value = shortID;
}
</script>

<template>
  <main>
    <div class="content">
      <h1 class="has-text-light">Fast Share</h1>
      <div>
        <form @submit.prevent="submit">
          <label for="url">Insert your url</label>
          <div class="input-field">
            <input
              type="text"
              class="input"
              :class="validUrl ? 'is-link' : 'is-danger'"
              placeholder="Enter your url"
              id="url"
              @blur="validateUrl"
              v-model="url"
            />
            <button type="submit" class="button is-link">Shorten</button>
          </div>
          <small v-if="!validUrl" class="has-text-danger">Invalid url</small>
        </form>
        <div v-if="error" class="has-text-danger">{{ error }}</div>
        <div class="shorten-link" v-if="shortenLink">
          <div>Link shortened:</div>
          <NuxtLink :to="shortenLink">{{ shortenLink }}</NuxtLink>
          <button class="button is-link" @click="copy(shortenLink)">
            Copy
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

.content {
  max-width: 860px;
  width: 100%;
}

form {
  width: 100%;
}

h1 {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 3rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.input-field {
  display: flex;
  gap: 0.5rem;
}

small {
  display: block;
  margin-top: 0.5rem;
  padding-left: 0.25rem;
}

.shorten-link {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
