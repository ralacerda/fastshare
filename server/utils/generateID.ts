import ShortUniqueId from "short-unique-id";

export default function () {
  const uid = new ShortUniqueId({
    dictionary: "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789".split(""),
  });

  return uid.fmt("$r3-$r3");
}
