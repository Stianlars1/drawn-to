(() => {
  const m = window.DrawnToMotion;
  const views = (names) =>
    `<div class="mo-image-views" role="group" aria-label="Explore the scene">${names.map((name, i) => `<button type="button" data-image-view="${i}" aria-pressed="${i === 0}">${name}</button>`).join("")}</div>`;
  const pages = [
    {
      id: "ember-portrait",
      order: 62,
      series: "motion",
      name: "a character in the details",
      reference: "_heyfaisal-2096513753865240860",
      theme: {
        background: "#56616b",
        ink: "#f3eee4",
        muted: "#c1c6c9",
        accent: "#f0bc77",
      },
      render() {
        return `<div class="mo-editorial-art"><img src="${m.asset("ember-portrait")}" alt="An original synthetic portrait in graphite, amber glass and intricate dark mechanical parts."></div><div class="mo-portrait-copy"><span class="mo-eyebrow">FORM WITH A POINT OF VIEW</span><h1>More than<br>a <em>surface.</em></h1><p>Personality lives in the details.<br>In how a thing catches the light.</p></div><div class="mo-portrait-bottom"><span data-view-note>A quiet presence. A complex interior.</span>${views(["Portrait", "The visor", "The mechanism"])}</div>`;
      },
      mount(root, o) {
        m.interactiveImage(root, o, [
          "A quiet presence. A complex interior.",
          "A fine mesh, held beneath curved amber glass.",
          "Small parts. One considered whole.",
        ]);
      },
    },
    {
      id: "terrain-interface",
      order: 63,
      series: "motion",
      name: "soft ground, clear intention",
      reference: "sinvpasha-2092537706446299362",
      theme: {
        background: "#f7f4ed",
        ink: "#3b3934",
        muted: "#8a7869",
        accent: "#c54b2f",
      },
      render() {
        return `<div class="mo-terrain-background mo-editorial-art"><img src="${m.asset("terrain-interface")}" alt=""></div><div class="mo-terrain-copy"><span class="mo-small-mark" aria-hidden="true">◒</span><h1>Soft ground.<br><em>Clear intention.</em></h1><p>A little warmth changes<br>how the work feels.</p><div class="mo-terrain-rail" role="group" aria-label="Choose a collection">${["A place for ideas", "A considered collection", "Room to keep growing"].map((t, i) => `<button type="button" data-collection="${i}" aria-pressed="${i === 0}"><span>0${i + 1}</span><b>${t}</b><i>↗</i></button>`).join("")}</div></div><div class="mo-terrain-window"><div class="mo-window-bar"><i></i><i></i><i></i><span>FIELDNOTES</span></div><div class="mo-terrain-app"><aside><strong>Your collection</strong><span class="active">Overview</span><span>Material studies</span><span>Saved directions</span><span>Recent ideas</span><small>A LITTLE SPACE<br>FOR WHAT MATTERS.</small></aside><section><div class="mo-terrain-app-head"><span>YOUR IDEAS, TOGETHER</span><strong data-collection-title>New impressions</strong></div><div class="mo-mini-surface"><i></i><i></i><i></i></div><div class="mo-terrain-rows"><span><i></i>Light studies<b>06</b></span><span><i></i>Material notes<b>12</b></span><span><i></i>Small discoveries<b>08</b></span></div><p data-collection-note>A collection starts with noticing.</p></section></div></div><div class="mo-terrain-front" aria-hidden="true"><img src="${m.asset("terrain-interface")}" alt=""></div><span class="mo-terrain-footer">A MATERIAL STUDY / ORIGINAL ARTWORK</span>`;
      },
      mount(root, { signal }) {
        const titles = [
            "New impressions",
            "Things that belong",
            "Space for what comes next",
          ],
          notes = [
            "A collection starts with noticing.",
            "Different objects. One point of view.",
            "Keep the direction open to a better idea.",
          ];
        root.querySelectorAll("[data-collection]").forEach((b) =>
          b.addEventListener(
            "click",
            () => {
              const i = +b.dataset.collection;
              root.dataset.collection = i;
              root.querySelector("[data-collection-title]").textContent =
                titles[i];
              root.querySelector("[data-collection-note]").textContent =
                notes[i];
              root
                .querySelectorAll("[data-collection]")
                .forEach((x) =>
                  x.setAttribute("aria-pressed", String(x === b)),
                );
            },
            { signal },
          ),
        );
      },
    },
    {
      id: "sunlit-field",
      order: 64,
      series: "motion",
      name: "a field worth noticing",
      reference: "Talhadesignn-2093215721954377839",
      theme: {
        background: "#ebd896",
        ink: "#283f32",
        muted: "#677047",
        accent: "#765825",
      },
      render() {
        return `<div class="mo-editorial-art"><img src="${m.asset("sunlit-field")}" alt="An original engraved agricultural valley with an irrigation stream, terraced fields, grasses and a pavilion."></div><div class="mo-field-copy"><span class="mo-eyebrow">A SLOWER WAY TO LOOK</span><h1>Some ideas<br>need room<br>to <em>grow.</em></h1><p>A direction with roots.<br>And room for a little wonder.</p></div><div class="mo-field-compass" aria-hidden="true"><span>N</span><i>✧</i><span>S</span></div><div class="mo-field-bottom"><span data-view-note>Every small part belongs to the landscape.</span>${views(["The valley", "The water", "The shelter"])}</div>`;
      },
      mount(root, o) {
        m.interactiveImage(root, o, [
          "Every small part belongs to the landscape.",
          "A line that carries the eye through the whole.",
          "A place to pause, before the next idea.",
        ]);
      },
    },
    {
      id: "thermal-type",
      order: 69,
      series: "motion",
      name: "type in heated air",
      reference: "RobertJohns-2090832456081608791",
      theme: {
        background: "#d2d3ce",
        ink: "#202c2c",
        muted: "#64706c",
        accent: "#ac5528",
      },
      render() {
        return `<div class="mo-editorial-art"><img src="${m.asset("thermal-type")}" alt="An original titanium heat chamber with intricate cooling fins and a luminous amber ceramic interior."></div><div class="mo-heat-host" data-heat-host></div><div class="mo-thermal-copy"><span class="mo-eyebrow">A PHYSICAL IMPRESSION</span><h1>Feel the<br><em>afterglow.</em></h1><p>Sharp edges. Warm light.<br>A little movement in the air.</p><button type="button" class="mo-thermal-trigger" data-heat aria-pressed="false">Pause heat</button></div><div class="mo-thermal-bottom"><span>TITANIUM / CERAMIC / LIGHT</span><span data-heat-note>Heat travels.<br>The air carries it.</span></div>`;
      },
      async mount(root, options) {
        const {mountHeat}=await import('../motion/heat.js');
        if(options.signal.aborted)return()=>{};
        return mountHeat(root, options);
      },
    },
  ];
  window.DrawnToPages = [...(window.DrawnToPages || []), ...pages];
})();
