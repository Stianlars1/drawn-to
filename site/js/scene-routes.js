/* Scene identity is stable; display order belongs to catalog-order.js. */
((scope) => {
  const legacy = Object.freeze({
    a: "narrow-dark",
    b: "pastel-stage",
    c: "paper-print",
    d: "dark-atmosphere",
    e: "technical-home",
    f: "ink-air",
    g: "isometric-blueprint",
    h: "emissive-signal",
    i: "tactile-instrument",
    j: "divider-trio",
    k: "pebble-trio",
    l: "print-ledger",
    m: "mosaic-gallery",
    n: "emissive-metrics",
    o: "frozen-interaction",
    p: "chapters",
    q: "outlined-bento",
    r: "instrument-hud",
    s: "paper-slips",
    t: "editorial-close",
    u: "proof-diptych",
    v: "correction-ledger",
    w: "two-registers",
    x: "stop-conditions",
    y: "reference-contact-sheet",
    z: "blend-matrix",
    A: "example-run",
    B: "agent-integrations",
    C: "measured-page",
    D: "light-dark",
  });
  const reverse = Object.fromEntries(
    Object.entries(legacy).map(([id, slug]) => [slug, id]),
  );
  const resolve = (value) => {
    try {
      value = decodeURIComponent(value || "");
    } catch {
      return "";
    }
    return Object.hasOwn(reverse, value) ? reverse[value] : value;
  };
  const slug = (value) => {
    const id = resolve(value);
    return Object.hasOwn(legacy, id) ? legacy[id] : id;
  };
  scope.DrawnToRoutes = Object.freeze({ legacy, resolve, slug });
})(globalThis);
