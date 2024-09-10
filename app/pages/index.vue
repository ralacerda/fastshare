<script setup lang="ts">
import * as v from "valibot";
import { useClipboard } from "@vueuse/core";

const runtimeConfig = useRuntimeConfig();
const { createLink, error, links } = useLinks();

const UrlSchema = v.pipe(v.string(), v.url());

const url = ref("");
const validUrl = ref(true);

const shortenID = ref("");

const shortenLink = computed(() => {
  return shortenID.value
    ? runtimeConfig.public.hostURL + "/" + shortenID.value
    : "";
});

const loading = ref(false);

const { copy } = useClipboard();

function validateUrl() {
  if (!url.value) return;
  const err = v.safeParse(UrlSchema, url.value);
  validUrl.value = err.success;
  return err.success;
}

async function submit() {
  if (!validateUrl()) return;

  loading.value = true;
  await createLink(url.value);
  loading.value = false;
}
</script>

<template>
  <main>
    <div class="content">
      <NavBar />
      <div>
        <form @submit.prevent="submit">
          <label for="url">Insert your url</label>
          <div class="input-field">
            <input
              type="text"
              id="url"
              @blur="validateUrl"
              v-model="url"
              :data-invalid="!validUrl ? true : undefined"
            />
            <button
              type="submit"
              class="button"
              :disabled="loading"
              :data-loading="loading ? true : undefined"
            >
              Shorten
            </button>
          </div>
          <small v-if="!validUrl" class="error">Invalid url</small>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="shorten-link" v-if="shortenLink">
          <div>Link shortened:</div>
          <NuxtLink :to="shortenLink">{{ shortenLink }}</NuxtLink>
          <button class="button" @click="copy(shortenLink)">Copy</button>
        </div>
        <RecentLinks :links />
      </div>
    </div>
    <footer>
      <div>
        Made by <a href="https://github.com/ralacerda">Renato Lacerda</a>
      </div>
      <div>
        Favicon Rabbit Emoji designed by
        <a href="https://openmoji.org/">OpenMoji</a>
      </div>
    </footer>
  </main>
</template>

<style scoped>
main {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100svh;
  padding-inline: 2rem;
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
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  line-height: 1.1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.input-field {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  input {
    flex-grow: 1;
    flex-basis: 360px;
  }
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

footer {
  align-self: end;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--foreground-light);
}

.error {
  font-size: 14px;
  color: var(--error-text);
}
</style>
