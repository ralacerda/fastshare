export default function composeLink(code: string) {
  const runtimeConfig = useRuntimeConfig();

  return runtimeConfig.public.hostURL + "/" + code;
}
