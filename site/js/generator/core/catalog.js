import { ROLE_IDS } from "./state.js";
const validId = (id) => typeof id === "string" && /^[a-f0-9]{20}$/.test(id);
export async function loadManifest(baseURL = location.href) {
  const response = await fetch(
    new URL("./data/generator/index.json", baseURL),
    { cache: "no-cache" },
  );
  if (!response.ok)
    throw new Error(
      "The reference catalog could not be loaded. Try again when the site is available.",
    );
  const manifest = await response.json();
  if (
    manifest.schema !== 1 ||
    !validId(manifest.current) ||
    !manifest.catalogs ||
    typeof manifest.catalogs !== "object"
  )
    throw new Error("The reference catalog has an unsupported format.");
  return manifest;
}
export async function loadCatalog(
  manifest,
  id = manifest.current,
  baseURL = location.href,
) {
  if (!validId(id) || !Object.hasOwn(manifest.catalogs, id))
    throw new Error(
      "This library snapshot is unavailable. Keep the original direction file or link; its sources have not been replaced.",
    );
  const entry = manifest.catalogs[id];
  if (entry.url !== `data/generator/catalogs/${id}.json`)
    throw new Error("This catalog has an invalid source address.");
  const response = await fetch(new URL("./" + entry.url, baseURL));
  if (!response.ok)
    throw new Error(
      "This library snapshot could not be loaded. Your saved direction has not been changed.",
    );
  const catalog = await response.json();
  if (
    catalog.schema !== 1 ||
    catalog.id !== id ||
    !Array.isArray(catalog.scenes) ||
    !catalog.scenes.length ||
    !catalog.properties ||
    !Array.isArray(catalog.roles)
  )
    throw new Error("The library snapshot has an unsupported format.");
  const { id: declared, ...content } = catalog;
  const hash = Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(JSON.stringify(content)),
      ),
    ),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 20);
  if (hash !== declared)
    throw new Error(
      "The library snapshot does not match its original content fingerprint. Reload before using it.",
    );
  for (const scene of catalog.scenes) {
    if (
      !/^[a-z0-9-]+$/.test(scene.id) ||
      !Array.isArray(scene.properties) ||
      !/^[a-f0-9]{64}$/.test(scene.thumbnailSha256 || "") ||
      scene.thumbnail !==
        `assets/generator/scenes/${scene.id}-${scene.thumbnailSha256.slice(0, 12)}.jpg` ||
      scene.url !== `/?still#${scene.id}`
    )
      throw new Error("A scene has invalid source metadata.");
    for (const id of scene.properties) {
      const p = catalog.properties[id];
      if (
        !p ||
        p.sceneId !== scene.id ||
        !ROLE_IDS.includes(p.role) ||
        p.path !== `references/scene-contracts/${scene.id}.json` ||
        p.id !== `${scene.id}::${p.key}`
      )
        throw new Error(
          "A property does not resolve to its original skill contract.",
        );
    }
  }
  return catalog;
}
