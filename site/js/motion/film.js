/** Authored shader film: no video bytes until intentional hover or playback. */
export function mountFilm(
  root,
  { signal, still = false, reducedMotion = false },
) {
  const host = root.querySelector("[data-mo-film]"),
    video = host.querySelector("video"),
    toggle = root.querySelector("[data-mo-pause]"),
    range = root.querySelector("[data-mo-range]");
  const media = matchMedia("(prefers-reduced-motion:reduce)"),
    connection = navigator.connection;
  let mode = 0,
    hover = false,
    manual = false,
    loaded = -1,
    generation = 0,
    disposed = false;
  const state = {
    kind: "silver-tide",
    backend: "authored-video",
    playing: false,
    loaded: false,
    disposed: false,
  };
  host.__filmState = state;
  function poster() {
    if (loaded !== mode) host.dataset.playing = "false";
    const base = `./assets/motion/posters/silver-tide-${mode}`;
    host.querySelector("img").src = base + ".webp";
    host.querySelector("source").srcset = base + "-mobile.webp";
    video.poster = base + ".webp";
  }
  function blocked() {
    return media.matches || connection?.saveData || document.hidden || disposed;
  }
  async function reconcile() {
    const token = ++generation;
    const run = (hover || manual) && !blocked();
    toggle.textContent = run ? "Pause motion" : "Play motion";
    toggle.setAttribute("aria-pressed", String(!run));
    if (!run) {
      video.pause();
      state.playing = false;
      return;
    }
    try {
      if (loaded !== mode) {
        video.pause();
        host.dataset.playing = "false";
        video.src = `./assets/motion/films/silver-tide-${mode}.mp4`;
        video.load();
        loaded = mode;
        state.loaded = true;
      }
      await video.play();
      if (disposed || token !== generation) return;
      host.dataset.playing = "true";
      state.playing = true;
    } catch {
      if (token !== generation || disposed) return;
      host.dataset.playing = "false";
      state.playing = false;
      manual = false;
      hover = false;
      toggle.textContent = "Play motion";
      toggle.setAttribute("aria-pressed", "true");
    }
  }
  root.querySelectorAll("[data-mo-mode]").forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        mode = Number(button.dataset.moMode);
        root
          .querySelectorAll("[data-mo-mode]")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        poster();
        reconcile();
      },
      { signal },
    ),
  );
  toggle.textContent = "Play motion";
  toggle.setAttribute("aria-pressed", "true");
  toggle.addEventListener(
    "click",
    () => {
      manual = !(manual || hover);
      hover = false;
      reconcile();
    },
    { signal },
  );
  host.addEventListener(
    "pointerenter",
    () => {
      if (!matchMedia("(pointer:fine)").matches || still) return;
      hover = true;
      reconcile();
    },
    { signal },
  );
  host.addEventListener(
    "pointerleave",
    () => {
      hover = false;
      reconcile();
    },
    { signal },
  );
  range.parentElement.querySelector("span").textContent = "Pace";
  range.parentElement.querySelector("output").value = "1.00×";
  video.playbackRate = 1;
  range.addEventListener(
    "input",
    () => {
      video.playbackRate = 0.5 + Number(range.value) / 100;
      range.parentElement.querySelector("output").value =
        video.playbackRate.toFixed(2) + "×";
    },
    { signal },
  );
  const preference = () => {
    const off = media.matches || connection?.saveData;
    toggle.hidden = off;
    range.parentElement.hidden = off;
    reconcile();
  };
  media.addEventListener("change", preference, { signal });
  connection?.addEventListener("change", preference, { signal });
  document.addEventListener("visibilitychange", reconcile, { signal });
  poster();
  preference();
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    state.disposed = true;
    state.playing = false;
    generation++;
    video.pause();
    video.removeAttribute("src");
    video.load();
  };
  signal.addEventListener("abort", cleanup, { once: true });
  return cleanup;
}
