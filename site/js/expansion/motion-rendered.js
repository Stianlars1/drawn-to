(() => {
  const m = window.DrawnToMotion;
  const pages = [
    {
      id: "auric-orbit",
      order: 56,
      series: "motion",
      name: "matter made luminous",
      reference: "zzzzshawn-2096548536972370319",
      theme: {
        background: "#090d12",
        ink: "#e5dfcf",
        muted: "#9e9f96",
        accent: "#ccad65",
      },
      render() {
        return `<div class="mo-auric-copy"><span class="mo-eyebrow">A STUDY OF INNER LIGHT</span><h1>Matter.<br><em>Made luminous.</em></h1><p>Rough at the edge.<br>Something warmer underneath.</p>${m.controls("The state of the surface", ["Mineral", "Awakened", "Glacial"])}</div>${m.stage("auric-orbit")}<div class="mo-auric-foot"><span>01 / THE MATERIAL OBSERVATORY</span>${m.range("Inner light")}${m.pause()}</div>`;
      },
      mount(root, o) {
        return m.mount(root, o, "auric-orbit");
      },
    },
    {
      id: "camera-obscura",
      order: 57,
      series: "motion",
      name: "every part has a purpose",
      reference: "omarsar0-2096339043919237288",
      theme: {
        background: "#e9e9dd",
        ink: "#343d39",
        muted: "#717a70",
        accent: "#a65337",
      },
      render() {
        return `<div class="mo-camera-top"><h1>Every part<br>has a <em>purpose.</em></h1><p>Look beyond the outline.<br>See what holds it together.</p></div>${m.stage("camera-obscura")}<aside class="mo-camera-aside"><span class="mo-eyebrow">FIELD / 01</span><p class="mo-camera-big">35<span>mm</span></p><span>AN OPTICAL STUDY</span><div><i></i><b>Housing &amp; controls</b><i></i><b>Lens &amp; aperture</b><i></i><b>Structure &amp; circuitry</b></div></aside><div class="mo-camera-bottom">${m.controls("Inspect the assembly", ["Assembled", "Exploded", "Inside"])}${m.range("Separation")}<span>Move across the object.<br>Notice the small things.</span></div>`;
      },
      mount(root, o) {
        return m.mount(root, o, "camera-obscura");
      },
    },
    {
      id: "plasma-study",
      order: 58,
      series: "motion",
      name: "an unsettled interior",
      reference: "zzzzshawn-2096548536972370319",
      theme: {
        background: "#ebebe1",
        ink: "#283c3c",
        muted: "#687876",
        accent: "#5b7774",
      },
      render() {
        return `${m.stage("plasma-study")}<div class="mo-plasma-copy"><span class="mo-eyebrow">SOMETHING BETWEEN STATES</span><h1>Still a form.<br><em>Always changing.</em></h1><p>Colour has depth.<br>Light has a way through.</p></div><div class="mo-plasma-bottom">${m.controls("A different atmosphere", ["Lagoon", "Violet", "Ember"])}${m.range("Excitation")}${m.pause()}</div>`;
      },
      mount(root, o) {
        return m.mount(root, o, "plasma-study");
      },
    },
    {
      id: "phosphor-field",
      order: 59,
      series: "motion",
      name: "life between the pixels",
      reference: "mnowakdesign-2091952693279436862",
      theme: {
        background: "#070c0e",
        ink: "#e1eee6",
        muted: "#9caaa4",
        accent: "#8df6b9",
      },
      render() {
        return `<div class="mo-phosphor-top"><span class="mo-eyebrow">ANOTHER WAY TO SEE A SIGNAL</span><h1>Between<br> the <em>pixels.</em></h1><p>One mark from a distance.<br>A thousand small decisions, up close.</p></div>${m.stage("phosphor-field")}<div class="mo-phosphor-bottom">${m.controls("Signal form", ["Wave", "Columns", "Orbit"])}${m.range("Cell density")}${m.pause()}</div>`;
      },
      mount(root, o) {
        return m.mount(root, o, "phosphor-field");
      },
    },
    {
      id: "silver-tide",
      order: 60,
      series: "motion",
      name: "a slower surface",
      reference: "vercel-2092999180780556643",
      theme: {
        background: "#080f14",
        ink: "#e3e7e5",
        muted: "#9facb1",
        accent: "#d7b184",
      },
      render() {
        return `${new URLSearchParams(location.search).has("capture") ? m.stage("silver-tide") : m.filmStage()}<div class="mo-tide-copy"><span class="mo-eyebrow">IN THE DIRECTION OF LIGHT</span><h1>A slower<br><em>surface.</em></h1></div><div class="mo-tide-note">Noticing the space<br>between one wave and the next.</div><div class="mo-tide-bottom">${m.controls("Light on the water", ["Silver", "Afterglow"])}${m.range("Swell")}${m.pause()}</div>`;
      },
      mount(root, o) {
        return new URLSearchParams(location.search).has("capture")
          ? m.mount(root, o, "silver-tide")
          : m.film(root, o);
      },
    },
    {
      id: "cloud-chamber",
      order: 61,
      series: "motion",
      name: "a window into elsewhere",
      reference: "JameslabiQ-2096555751133376528",
      theme: {
        background: "#dce4de",
        ink: "#263733",
        muted: "#5d716a",
        accent: "#98764a",
      },
      render() {
        return `${m.stage("cloud-chamber")}<div class="mo-cloud-copy"><span class="mo-eyebrow">WHERE AN IDEA BECOMES A PLACE</span><h1>A window<br>into <em>elsewhere.</em></h1><p>A little perspective.<br>A different way of seeing.</p><span class="mo-cloud-line"></span></div><div class="mo-cloud-bottom"><span>STONE / LIGHT / REFLECTION</span>${m.controls("Inside the opening", ["Clear", "Warm", "Cool"])}${m.pause()}</div>`;
      },
      mount(root, o) {
        return m.mount(root, o, "cloud-chamber");
      },
    },
    {
      id: "morph-study",
      order: 70,
      series: "motion",
      name: "a shape for the change",
      reference: "semochkin_alex-2091816203383664688",
      theme: {
        background: "#dcf3d7",
        ink: "#1e493c",
        muted: "#608176",
        accent: "#2b6953",
      },
      render() {
        return `<div class="mo-morph-header"><span class="mo-eyebrow">KEEP THE IDEA. CHANGE ITS FORM.</span><h1>A shape for<br><em>the change.</em></h1><p>Thousands of small pieces.<br>One continuous point of view.</p></div>${m.stage("morph-study")}<div class="mo-morph-bottom">${m.controls("Explore a structure", ["Sphere", "Current", "Loop"])}${m.range("Formation")}${m.pause()}</div>`;
      },
      mount(root, o) {
        return m.mount(root, o, "morph-study");
      },
    },
  ];
  window.DrawnToPages = [...(window.DrawnToPages || []), ...pages];
})();
