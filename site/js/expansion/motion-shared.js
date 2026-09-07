(() => {
  const asset = (name) => `./assets/motion/${name}.webp`;
  const arrow = '<span aria-hidden="true">↗</span>';
  function controls(
    label,
    choices = ["Quiet", "Present", "Alive"],
    initial = 0,
  ) {
    return `<div class="mo-controls"><span class="mo-control-label">${label}</span><div class="mo-choices" role="group" aria-label="${label}">${choices.map((text, i) => `<button type="button" data-mo-mode="${i}" aria-pressed="${i === initial}">${text}</button>`).join("")}</div></div>`;
  }
  function range(label, value = 50) {
    return `<label class="mo-range"><span>${label}</span><output>${value}</output><input type="range" min="0" max="100" value="${value}" aria-label="${label}" data-mo-range></label>`;
  }
  function stage(id) {
    return `<div class="mo-host" data-mo-host><picture><source media="(max-width:720px)" srcset="./assets/motion/posters/${id}-0-mobile.webp"><img class="mo-poster" src="./assets/motion/posters/${id}-0.webp" alt=""></picture></div>`;
  }
  function filmStage() {
    return `<div class="mo-host" data-mo-film><picture><source media="(max-width:720px)" srcset="./assets/motion/posters/silver-tide-0-mobile.webp"><img class="mo-poster" src="./assets/motion/posters/silver-tide-0.webp" alt=""></picture><video muted playsinline loop preload="none" aria-hidden="true"></video></div>`;
  }
  async function film(root, options) {
    const { mountFilm } = await import("../motion/film.js");
    if (options.signal.aborted) return () => {};
    return mountFilm(root, options);
  }
  const pause = () =>
    '<button type="button" class="mo-pause" data-mo-pause>Pause motion</button>';
  async function mount(root, options, id) {
    let cleanup = () => {},
      fallback = false,
      value = 0.5,
      mode = 0;
    const host = root.querySelector("[data-mo-host]"),
      range = root.querySelector("[data-mo-range]");
    function poster() {
      const suffix = innerWidth < 720 ? "-mobile" : "";
      const base = `./assets/motion/posters/${id}-${mode}`;
      host.querySelector("img").src = base + ".webp";
      host.querySelector("source").srcset = base + "-mobile.webp";
    }
    function fallbackOn() {
      if (options.signal.aborted) return;
      fallback = true;
      host.dataset.fallback = "true";
      poster();
      root.querySelector("[data-mo-pause]")?.setAttribute("hidden", "");
      if (range) {
        range.disabled = true;
        range.closest("label").hidden = true;
      }
    }
    function cameraRange() {
      if (range && id === "camera-obscura" && !fallback) {
        range.disabled = mode === 0;
        range.closest("label").classList.toggle("mo-disabled", mode === 0);
        range.parentElement.querySelector("output").value =
          mode === 0 ? "Closed" : range.value;
      }
    }
    cameraRange();
    root.querySelectorAll("[data-mo-mode]").forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          mode = Number(button.dataset.moMode);
          cameraRange();
          root.dataset.moMode = String(mode);
          root
            .querySelectorAll("[data-mo-mode]")
            .forEach((b) =>
              b.setAttribute("aria-pressed", String(b === button)),
            );
          if (fallback) poster();
          else host.__motion?.setMode(mode);
        },
        { signal: options.signal },
      ),
    );
    range?.addEventListener(
      "input",
      () => {
        value = Number(range.value) / 100;
        range.parentElement.querySelector("output").value = range.value;
        host.__motion?.setValue(value);
      },
      { signal: options.signal },
    );
    const toggle = root.querySelector("[data-mo-pause]");
    let paused = options.still || options.reducedMotion;
    if (toggle) {
      toggle.textContent = paused ? "Play motion" : "Pause motion";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.addEventListener(
        "click",
        () => {
          paused = !paused;
          toggle.textContent = paused ? "Play motion" : "Pause motion";
          toggle.setAttribute("aria-pressed", String(paused));
          host.__motion?.[paused ? "pause" : "play"]();
        },
        { signal: options.signal },
      );
    }
    host.addEventListener("motion-fallback", fallbackOn, {
      signal: options.signal,
      once: true,
    });
    if (
      new URLSearchParams(location.search).get("gpu") === "off" ||
      navigator.connection?.saveData
    ) {
      fallbackOn();
      return cleanup;
    }
    try {
      const { mountMotion } = await import("../motion/runtime.js");
      if (options.signal.aborted) return cleanup;
      cleanup = await mountMotion(host, { ...options, kind: id });
      if (options.signal.aborted) {
        cleanup();
        return () => {};
      }
      host.__motion?.setValue(value);
      if (options.still)
        host.__motion?.setTime(
          Number(new URLSearchParams(location.search).get("t")) || 0,
        );
      return cleanup;
    } catch (error) {
      cleanup();
      host.dataset.renderError = String(error);
      fallbackOn();
      return () => {};
    }
  }
  function interactiveImage(root, { signal, reducedMotion }, configs) {
    const art = root.querySelector(".mo-editorial-art");
    let active = 0;
    root.querySelectorAll("[data-image-view]").forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          active = Number(button.dataset.imageView);
          root.dataset.view = String(active);
          root
            .querySelectorAll("[data-image-view]")
            .forEach((b) =>
              b.setAttribute("aria-pressed", String(b === button)),
            );
          if (configs?.[active])
            root.querySelector("[data-view-note]").textContent =
              configs[active];
        },
        { signal },
      ),
    );
    if (art && !reducedMotion) {
      art.addEventListener(
        "pointermove",
        (event) => {
          if (!matchMedia("(pointer:fine)").matches) return;
          const r = art.getBoundingClientRect();
          root.style.setProperty(
            "--mx",
            ((event.clientX - r.left) / r.width - 0.5).toFixed(3),
          );
          root.style.setProperty(
            "--my",
            ((event.clientY - r.top) / r.height - 0.5).toFixed(3),
          );
        },
        { signal },
      );
      art.addEventListener(
        "pointerleave",
        () => {
          root.style.setProperty("--mx", 0);
          root.style.setProperty("--my", 0);
        },
        { signal },
      );
    }
  }
  window.DrawnToMotion = {
    asset,
    arrow,
    controls,
    range,
    stage,
    filmStage,
    film,
    pause,
    mount,
    interactiveImage,
  };
})();
