import type { Link } from "~~/drizzle/schema";
import type { SerializeObject } from "nitropack";

export default function useLinks() {
  const links = ref<Link[]>([]);
  const pending = ref(false);
  const error = ref<Error | null>(null);

  const { user } = useUserSession();

  async function fetchLinks() {
    if (!user.value) return;

    pending.value = true;

    try {
      const { data } = await useFetch("/api/getRecentLinks", {
        query: {
          user: user.value.id,
        },
      });

      console.log(data.value!.links);

      pending.value = false;
      links.value = data.value!.links.map(normalizePayload);
    } catch (e) {
      pending.value = false;
      if (!(e instanceof Error)) throw e;
      error.value = e;
    }
  }

  async function createLink(url: string) {
    const { newLink } = await $fetch("/api/createLink", {
      method: "POST",
      body: {
        url,
      },
      onResponseError: async ({ response }) => {
        error.value = response._data.message;
      },
    });

    if (newLink) {
      links.value = [normalizePayload(newLink), ...(links.value || [])];
    }
  }

  return {
    links,
    pending,
    error,
    createLink,
    fetchLinks,
  };
}

function normalizePayload(payload: SerializeObject<Link>): Link {
  return {
    id: payload.id,
    url: payload.url,
    code: payload.code,
    createAt: payload.createAt ? new Date(payload.createAt) : null,
    image: payload.image,
    title: payload.title,
    description: payload.description,
    userId: payload.userId,
  };
}
