(() => {
  const assets = "./assets/expansion/editorial/";
  const repo = "https://github.com/Stianlars1/drawn-to";
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const cream = {
    background: "#f7f3e9",
    ink: "#254c7b",
    muted: "#475e7a",
    accent: "#254c7b",
  };
  const warm = {
    background: "#f6f2ec",
    ink: "#27251f",
    muted: "#655f55",
    accent: "#a94f2d",
  };
  const material = [
    ["Chrome ribbon", "material-studies.webp", "0% 0%", "300% 200%"],
    ["Red curtain", "material-studies.webp", "50% 0%", "300% 200%"],
    ["Travertine arch", "material-studies.webp", "100% 0%", "300% 200%"],
    ["Amber resin", "material-studies.webp", "0% 100%", "300% 200%"],
    ["Green leaves", "material-studies.webp", "50% 100%", "300% 200%"],
    ["Blue glass", "material-studies.webp", "100% 100%", "300% 200%"],
    ["Walnut wall", "material-details.webp", "0% 0%", "200% 200%"],
    ["Folded paper", "material-details.webp", "100% 0%", "200% 200%"],
    ["Green glass", "material-details.webp", "0% 100%", "200% 200%"],
    ["Indigo textile", "material-details.webp", "100% 100%", "200% 200%"],
  ];
  const materialStyle = (item) =>
    `background-image:url('${assets + item[1]}');background-position:${item[2]};background-size:${item[3]}`;
  function copyAction(
    root,
    buttonSelector,
    value,
    signal,
    statusSelector = ".ed-status",
  ) {
    root.querySelector(buttonSelector)?.addEventListener(
      "click",
      async () => {
        const text = typeof value === "function" ? value() : value;
        const status = root.querySelector(statusSelector);
        try {
          await navigator.clipboard.writeText(text);
          if (!signal?.aborted)
            status.textContent = "Copied. Ready for your next conversation.";
        } catch {
          if (!signal?.aborted)
            status.textContent = `Copy this prompt: ${text}`;
        }
      },
      { signal },
    );
  }
  const modes = [
    {
      name: "Explore",
      headline: "Open it up.",
      description: "Find a direction worth following.",
      lines: [
        "Study visual references",
        "Compare distinct directions",
        "Keep useful possibilities open",
      ],
      prompt:
        "Use Drawn To to explore distinct visual directions for my project. Read the project context first, then ask about the consequential gaps.",
    },
    {
      name: "Specify",
      headline: "Make it clear.",
      description: "Turn a preference into decisions.",
      lines: [
        "Choose the visual language",
        "Set composition and material",
        "Record a shared design lock",
      ],
      prompt:
        "Use Drawn To to turn my chosen visual direction into a design lock, including composition, typography, material and motion.",
    },
    {
      name: "Build",
      headline: "Bring it to life.",
      description: "Give the direction a working form.",
      lines: [
        "Build within the approved lock",
        "Review the actual browser render",
        "Refine the details that matter",
      ],
      prompt:
        "Use Drawn To to implement the approved design lock, then review the real browser output at desktop and mobile sizes.",
    },
  ];

  const pages = [
    {
      id: "scenic-close",
      order: 31,
      name: "A considered ending",
      reference: "AdityaSur11-2096160317458030911",
      theme: cream,
      render() {
        return `<section class="ed-scenic"><div class="ed-scenic-copy"><h1>Make it yours.</h1><p>A visual direction should feel like<br>somewhere you want to stay.</p></div><div class="ed-scenic-next"><p>Begin with a point of view.</p><button class="ed-text-button" data-start>Copy a starting prompt <span aria-hidden="true">↗</span></button><a href="${repo}/tree/main/skills/drawn-to/references">Walk through the library <span aria-hidden="true">↗</span></a><p class="ed-status" role="status"></p></div><img class="ed-scenic-art" src="${assets}garden-panorama.png" alt="An original blue engraving of a garden house, mature oak and quiet shoreline."><span class="ed-scenic-note">A direction, thoughtfully inhabited.</span></section>`;
      },
      mount(root, { signal }) {
        copyAction(
          root,
          "[data-start]",
          "Use Drawn To to help me find a visual direction that fits my project. Start by understanding what it is for and the people it should serve.",
          signal,
        );
        return () => {};
      },
    },
    {
      id: "warm-choices",
      order: 32,
      name: "Room for the next step",
      reference: "DesignByMoein-2095937596665024817",
      theme: warm,
      render() {
        return `<section class="ed-choices"><header><h1>A direction for<br>where you are.</h1><p>Choose the kind of help your idea needs.</p></header><div class="ed-mode-tabs" aria-label="Choose a working mode">${modes.map((m, i) => `<button data-mode="${i}" aria-pressed="${i === 1}">${m.name}</button>`).join("")}</div><div class="ed-choice-grid"><div class="ed-peeker" aria-hidden="true"><img src="${assets}peeking-bird.png" alt=""></div>${modes.map((m, i) => `<article class="ed-choice-card" data-card="${i}" data-selected="${i === 1}"><div class="ed-choice-top"><h2>${m.name}</h2><span class="ed-choice-chosen">Selected</span></div><p class="ed-choice-headline">${m.headline}</p><p class="ed-choice-description">${m.description}</p><ul>${m.lines.map((line) => `<li><span aria-hidden="true">✓</span>${line}</li>`).join("")}</ul><button data-mode="${i}" aria-pressed="${i === 1}">Choose ${m.name}<span aria-hidden="true">↗</span></button></article>`).join("")}</div><div class="ed-choice-prompt"><p data-mode-summary>Turn your chosen direction into a written design lock.</p><button class="ed-text-button" data-copy-mode>Copy this prompt <span aria-hidden="true">↗</span></button><p class="ed-status" role="status"></p></div></section>`;
      },
      mount(root, { signal }) {
        let selected = 1;
        const summaries = [
          "Explore distinct visual directions before you commit.",
          "Turn your chosen direction into a written design lock.",
          "Build the approved direction and review the rendered result.",
        ];
        root.querySelectorAll("[data-mode]").forEach((button) =>
          button.addEventListener(
            "click",
            () => {
              selected = Number(button.dataset.mode);
              root
                .querySelectorAll("[data-mode]")
                .forEach((b) =>
                  b.setAttribute(
                    "aria-pressed",
                    String(Number(b.dataset.mode) === selected),
                  ),
                );
              root
                .querySelectorAll("[data-card]")
                .forEach(
                  (card) =>
                    (card.dataset.selected = String(
                      Number(card.dataset.card) === selected,
                    )),
                );
              root.querySelector("[data-mode-summary]").textContent =
                summaries[selected];
              root.querySelector(".ed-status").textContent = "";
            },
            { signal },
          ),
        );
        copyAction(
          root,
          "[data-copy-mode]",
          () => modes[selected].prompt,
          signal,
        );
        return () => {};
      },
    },
    {
      id: "character-close",
      order: 33,
      name: "Leave room for an idea",
      reference: "DesignByMoein-2096289484577071567",
      theme: warm,
      render({ command }) {
        return `<section class="ed-character"><div class="ed-character-story"><h1>Good work.<br>A little room<br>to breathe.</h1><img src="${assets}studio-bird.png" alt="An original clay bird sketching on a stack of art books, beside a plant and paintbrushes."></div><div class="ed-brief"><h2>Take the next<br>thought with you.</h2><p>A small starting brief for your next conversation.</p><form><label for="ed-starting-brief">What are you making?</label><textarea id="ed-starting-brief" name="brief" rows="3" placeholder="A place, a product, a new point of view…" required maxlength="1200"></textarea><button class="xp-button" type="submit">Save a starting brief <span aria-hidden="true">↓</span></button><p class="ed-status" role="status"></p></form><div class="ed-character-install"><span>Bring Drawn To along.</span><button type="button" data-install>Copy install command <span aria-hidden="true">↗</span></button><p class="ed-install-status" role="status"></p><code>${esc(command)}</code></div></div></section>`;
      },
      mount(root, { signal }) {
        root.querySelector("form").addEventListener(
          "submit",
          (event) => {
            event.preventDefault();
            const brief = root.querySelector("textarea").value.trim();
            if (!brief) {
              root
                .querySelector("textarea")
                .setCustomValidity(
                  "Add a few words about what you are making.",
                );
              root.querySelector("textarea").reportValidity();
              return;
            }
            const content = `# A starting brief\n\n${brief}\n\n## The next conversation\n\nUse Drawn To to understand the project, explore suitable visual directions, and ask about the consequential gaps before making a design lock.\n`;
            const blob = new Blob([content], {
              type: "text/markdown;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "a-starting-brief.md";
            link.click();
            URL.revokeObjectURL(url);
            root.querySelector(".ed-status").textContent =
              "Your starting brief is ready to keep.";
          },
          { signal },
        );
        root
          .querySelector("textarea")
          .addEventListener(
            "input",
            (event) => event.target.setCustomValidity(""),
            { signal },
          );
        copyAction(
          root,
          "[data-install]",
          root.querySelector("code").textContent,
          signal,
          ".ed-install-status",
        );
        return () => {};
      },
    },
    {
      id: "arch-editorial",
      order: 34,
      name: "Taste, in different forms",
      reference: "LexnLin-2096045877760795063",
      theme: {
        background: "#f3f1e8",
        ink: "#213a30",
        muted: "#56655b",
        accent: "#213a30",
      },
      render() {
        const subjects = [7, 4, 2, 7, 4, 2, 7];
        return `<section class="ed-arch"><h1>Taste.</h1><div class="ed-arch-intro"><p>One point of view.<br>More than one way to express it.</p><button class="ed-text-button" data-next-material>Change the view <span aria-hidden="true">↗</span></button></div><div class="ed-arch-frieze" aria-label="Explore material studies">${subjects.map((s, i) => `<button class="ed-arch-strip" data-strip="${i}" data-material="${s}" aria-label="Select ${material[s][0]}" aria-pressed="${i === 0}"><span style="${materialStyle(material[s])}"></span></button>`).join("")}</div><div class="ed-arch-caption" aria-live="polite"><span data-material-name>Folded paper</span><span data-material-note>Quiet form. Tactile detail.</span></div></section>`;
      },
      mount(root, { signal }) {
        const buttons = [...root.querySelectorAll("[data-strip]")];
        let selected = 0;
        const notes = {
          7: "Quiet form. Tactile detail.",
          4: "Organic rhythm. A living texture.",
          2: "Warm material. Clear structure.",
        };
        function select(index) {
          selected = index;
          buttons.forEach((b, i) =>
            b.setAttribute("aria-pressed", String(i === index)),
          );
          const item = Number(buttons[index].dataset.material);
          root.querySelector("[data-material-name]").textContent =
            material[item][0];
          root.querySelector("[data-material-note]").textContent = notes[item];
        }
        buttons.forEach((button, i) =>
          button.addEventListener("click", () => select(i), { signal }),
        );
        root.querySelector("[data-next-material]").addEventListener(
          "click",
          () => {
            const visible = buttons
              .map((button, index) => ({ button, index }))
              .filter(({ button }) => button.offsetWidth > 0);
            const current = visible.findIndex(
              ({ index }) => index === selected,
            );
            select(visible[(current + 1) % visible.length].index);
          },
          { signal },
        );
        const observer = new ResizeObserver(() => {
          if (!buttons[selected].offsetWidth) select(0);
        });
        observer.observe(root);
        return () => observer.disconnect();
      },
    },
    {
      id: "kinetic-collection",
      order: 35,
      name: "A moving collection",
      reference: "basit_designs-2095862418518008252",
      theme: {
        background: "#fdfdfb",
        ink: "#23251f",
        muted: "#60645a",
        accent: "#23251f",
      },
      render() {
        return `<section class="ed-collection"><div class="ed-orbit" aria-hidden="true">${material.map((m, i) => `<div class="ed-material ed-material-${i}"><span style="${materialStyle(m)}"></span></div>`).join("")}</div><div class="ed-collection-copy"><h1>Find your own<br><em>point of view.</em></h1><p>Different materials. Different moods.<br>A direction that belongs to your project.</p><div class="ed-collection-actions"><button class="xp-button" data-shuffle>Another arrangement <span aria-hidden="true">↗</span></button><button class="ed-text-button" data-motion aria-pressed="false">Pause motion</button></div><span class="ed-collection-status" role="status">A collection of original material studies.</span></div></section>`;
      },
      mount(root, { signal, reducedMotion, still }) {
        const nodes = [...root.querySelectorAll(".ed-material span")];
        const planes = [...root.querySelectorAll(".ed-material")];
        const connection = navigator.connection;
        const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
        let paused = Boolean(reducedMotion || still),
          hover = false,
          visible = true,
          arrangement = 0;
        let animations = [];
        const offsets = [
          0, 0.43, 1.14, 1.66, 2.26, 2.9, 3.46, 4.09, 4.84, 5.54,
        ];
        const sizes = [230, 124, 190, 268, 143, 210, 113, 176, 138, 160];
        const duration = 32000;
        const motion = root.querySelector("[data-motion]");
        const status = root.querySelector(".ed-collection-status");

        function composePath() {
          const progress = Number(animations[0]?.currentTime || 0) % duration;
          animations.forEach((animation) => animation.cancel());
          const box = root.getBoundingClientRect();
          const reading = [
            ...root.querySelectorAll(
              ".ed-collection-copy h1,.ed-collection-copy>p,.ed-collection-actions,.ed-collection-status",
            ),
          ].map((node) => node.getBoundingClientRect());
          const safe = {
            left: Math.min(...reading.map((r) => r.left)) - box.left,
            right: Math.max(...reading.map((r) => r.right)) - box.left,
            top: Math.min(...reading.map((r) => r.top)) - box.top,
            bottom: Math.max(...reading.map((r) => r.bottom)) - box.top,
          };
          const shell = root.closest(".xp-shell");
          const chromeTop =
            Math.max(
              ...[...shell.querySelectorAll(".xp-header")].map(
                (e) => e.getBoundingClientRect().bottom,
              ),
            ) - box.top;
          const chromeBottom =
            Math.min(
              ...[
                ...shell.querySelectorAll(".xp-footer"),
                ...document.querySelectorAll("#chrome .ctl"),
              ].map((e) => e.getBoundingClientRect().top),
            ) - box.top;
          const mobile = box.width < 721;
          const scale = mobile
            ? 0.52
            : Math.min(box.width / 1250, box.height / 700);

          animations = planes.map((plane, index) => {
            const size = sizes[index] * scale;
            plane.style.width = `${size}px`;
            const frames = Array.from({ length: 97 }, (_, step) => {
              const angle = offsets[index] + (step / 96) * Math.PI * 2;
              const depth = Math.cos(angle) * 215;
              const projection = 900 / (900 - depth);
              const yaw = Math.sin(angle * 2) * 43;
              const pitch = Math.sin(angle) * 59;
              const roll = Math.cos(angle) * 18;
              const faceScale = 0.78 + 0.22 * Math.abs(Math.cos(angle));
              let x =
                box.width * 0.5 +
                Math.cos(angle) * box.width * (mobile ? 0.57 : 0.46);
              let y =
                box.height * 0.5 +
                Math.sin(angle) * box.height * 0.45 +
                Math.sin(angle * 2 + 0.4) * box.height * 0.035;
              const rotation = new DOMMatrix()
                .rotate(0, yaw, 0)
                .rotate(pitch, 0, 0)
                .rotate(0, 0, roll);
              const corners = [-1, 1].flatMap((a) =>
                [-1, 1].map((b) =>
                  rotation.transformPoint(
                    new DOMPoint(
                      (a * size * faceScale) / 2,
                      (b * size * faceScale) / 2,
                      0,
                    ),
                  ),
                ),
              );
              for (let pass = 0; pass < 3; pass++) {
                const tx0 = (x - box.width / 2) / projection,
                  ty0 = (y - box.height / 2) / projection;
                const projected = corners.map((c) => {
                  const q = 900 / (900 - depth - c.z);
                  return {
                    x: (tx0 + c.x) * q - (x - box.width / 2),
                    y: (ty0 + c.y) * q - (y - box.height / 2),
                  };
                });
                const rx =
                  Math.max(...projected.map((c) => Math.abs(c.x))) + 13;
                const ry =
                  Math.max(...projected.map((c) => Math.abs(c.y))) + 13;
                const dx = x - box.width / 2,
                  dy = y - box.height / 2;
                const halfWidth = Math.max(
                  box.width / 2 - safe.left,
                  safe.right - box.width / 2,
                );
                const halfHeight = Math.max(
                  box.height / 2 - safe.top,
                  safe.bottom - box.height / 2,
                );
                const clearance = Math.max(
                  1,
                  Math.min(
                    (halfWidth + rx) / Math.max(Math.abs(dx), 0.001),
                    (halfHeight + ry) / Math.max(Math.abs(dy), 0.001),
                  ),
                );
                x = box.width / 2 + dx * clearance;
                y = box.height / 2 + dy * clearance;
                y = Math.max(
                  chromeTop + ry + 10,
                  Math.min(chromeBottom - ry - 10, y),
                );
                if (
                  x + rx > safe.left &&
                  x - rx < safe.right &&
                  y + ry > safe.top &&
                  y - ry < safe.bottom
                ) {
                  x =
                    Math.cos(angle) < 0
                      ? safe.left - rx - 8
                      : safe.right + rx + 8;
                }
              }
              const tx = (x - box.width / 2) / projection;
              const ty = (y - box.height / 2) / projection;
              return {
                transform: `translate(-50%,-50%) translate3d(${tx}px,${ty}px,${depth}px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotateZ(${roll}deg) scale(${faceScale})`,
                filter: `brightness(${0.93 + ((depth + 215) / 430) * 0.07})`,
              };
            });
            const animation = plane.animate(frames, {
              duration,
              iterations: Infinity,
              easing: "linear",
            });
            animation.currentTime = progress;
            return animation;
          });
          sync();
        }
        function sync() {
          const stop =
            paused ||
            hover ||
            !visible ||
            document.hidden ||
            Boolean(still) ||
            Boolean(reducedMotion) ||
            motionPreference.matches ||
            Boolean(connection?.saveData);
          animations.forEach((a) => (stop ? a.pause() : a.play()));
          motion.textContent =
            reducedMotion || motionPreference.matches
              ? "Motion reduced"
              : connection?.saveData
                ? "Data saver"
                : still
                  ? "Motion paused"
                  : paused
                    ? "Play motion"
                    : "Pause motion";
          motion.setAttribute("aria-pressed", String(paused));
          motion.disabled = Boolean(
            reducedMotion ||
            motionPreference.matches ||
            still ||
            connection?.saveData,
          );
        }
        composePath();
        const resizeObserver = new ResizeObserver(composePath);
        resizeObserver.observe(root);
        motion.addEventListener(
          "click",
          () => {
            paused = !paused;
            sync();
          },
          { signal },
        );
        root.querySelector(".ed-orbit").addEventListener(
          "pointerenter",
          () => {
            hover = true;
            sync();
          },
          { signal },
        );
        root.querySelector(".ed-orbit").addEventListener(
          "pointerleave",
          () => {
            hover = false;
            sync();
          },
          { signal },
        );
        document.addEventListener("visibilitychange", sync, { signal });
        connection?.addEventListener("change", sync, { signal });
        motionPreference.addEventListener("change", sync, { signal });
        const observer = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
          sync();
        });
        observer.observe(root);
        root.querySelector("[data-shuffle]").addEventListener(
          "click",
          () => {
            arrangement = (arrangement + 1) % material.length;
            nodes.forEach((node, i) => {
              node.style.cssText = materialStyle(
                material[(i + arrangement) % material.length],
              );
            });
            status.textContent = `Arrangement ${arrangement + 1} of ${material.length}. Original material studies.`;
          },
          { signal },
        );
        return () => {
          observer.disconnect();
          resizeObserver.disconnect();
          document.removeEventListener("visibilitychange", sync);
          connection?.removeEventListener("change", sync);
          motionPreference.removeEventListener("change", sync);
          animations.forEach((a) => a.cancel());
        };
      },
    },
  ];
  window.DrawnToPages = [...(window.DrawnToPages || []), ...pages];
})();
