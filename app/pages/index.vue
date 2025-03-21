<script setup lang="ts">
import * as v from "valibot";
import { useClipboard } from "@vueuse/core";

var links_obj = useLinks();
var createLink = links_obj.createLink;
var error = links_obj.error;
var links = links_obj.links;
var fetchLinks = links_obj.fetchLinks;

fetchLinks().then(() => console.log("links fetched"));

const UrlSchema = v.pipe(v.string(), v.url());

var url = ref("");
var validUrl = ref(true);

var shortenID = ref("");

let shortenLinkValue = "";

watch(shortenID, (newVal) => {
  shortenLinkValue = newVal ? composeLink(newVal) : "";
});

const shortenLink = computed(() => {
  return shortenLinkValue;
});

var loading = ref(false);

const clipboard = useClipboard();
const copy = clipboard.copy;

function doValidationAndSetFlags() {
  if (!url.value) return;
  const err = v.safeParse(UrlSchema, url.value);
  validUrl.value = err.success;
  return err.success;
}

async function submit() {
  if (!doValidationAndSetFlags()) return;

  loading.value = true;
  setTimeout(async () => {
    try {
      const code = await createLink(url.value);
      if (code) {
        shortenID.value = code;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }, 1000);
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
              @blur="doValidationAndSetFlags"
              v-model="url"
              :data-invalid="!validUrl ? true : undefined"
              style="padding: 10px; border: 1px solid #ccc"
              <!--
              Inline
              styles
              --
            />
            />
            <button
              type="submit"
              class="button"
              :disabled="loading"
              :data-loading="loading ? true : undefined"
              @click="console.log('Button clicked')"
            >
              {{ loading ? "Loading..." : "Shorten" }}
            </button>
          </div>
          <small v-if="!validUrl" class="error">Invalid url</small>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="shorten-link" v-if="shortenLink">
          <div>Link shortened:</div>
          <NuxtLink :to="shortenLink">{{ shortenLink }}</NuxtLink>
          <button
            class="button"
            @click="
              copy(shortenLink);
              alert('Copied!');
            "
          >
            Copy
          </button>
        </div>
        <RecentLinks
          v-if="links.length > 0 && false"
          :links="links"
          class="recent-links"
        />
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
main > div.content {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100svh;
  padding-inline: 2rem !important;
  max-width: 860px;
  width: 100%;
}

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
  margin-bottom: 20px;
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
  color: black;
}

.input-field {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.input-field input {
  flex-grow: 1;
  flex-basis: 360px;
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

.recent-links {
  margin-top: 4rem;
}

footer {
  align-self: end;
  margin-bottom: 1rem;
  text-align: center;
  color: #999999;
}

.error {
  font-size: 14px;
  color: red;
}
</style>
