export const roles = [
  "layout",
  "typography",
  "color",
  "shape",
  "graphics",
  "material",
  "light",
  "motion",
  "interaction",
];
const defs = [
  ["plasma-study", "shape", "Spherical silhouette"],
  ["plasma-study", "color", "Mineral color field"],
  ["plasma-study", "motion", "Evolving field"],
  ["plasma-study", "layout", "Editorial split"],
  ["plasma-study", "typography", "Editorial type"],
  ["particle-assembly", "graphics", "Fine particle construction"],
  ["particle-assembly", "color", "Cool points"],
  ["particle-assembly", "motion", "Gather and release"],
  ["auric-orbit", "shape", "Rough mineral form"],
  ["auric-orbit", "material", "Gold veins"],
];
export const catalog = {
  schema: 1,
  id: "fixture-v1",
  sourceRevision: "f3cc3ed2b69a8e4ced31c8c4217e7a044dc8f505",
  sourcePublished: true,
  roles: roles.map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) })),
  properties: Object.fromEntries(
    defs.map(([sceneId, role, label]) => [
      `${sceneId}::${role}`,
      {
        id: `${sceneId}::${role}`,
        sceneId,
        role,
        label,
        text: "APPEARANCE_SENTINEL must stay in the skill",
        path: `references/scene-contracts/${sceneId}.json`,
        key: role,
        sources:
          sceneId === "particle-assembly"
            ? [
                {
                  id: "krispuckett-2095994089917522241",
                  section: "Graphic language",
                },
              ]
            : [],
      },
    ]),
  ),
};
catalog.scenes = ["plasma-study", "particle-assembly", "auric-orbit"].map(
  (id) => ({
    id,
    legacyId: id,
    name: id.replaceAll("-", " "),
    kind: "graphic",
    thumbnail: `assets/generator/scenes/${id}.webp`,
    url: `/?still#${id}`,
    properties: defs.filter((x) => x[0] === id).map((x) => `${id}::${x[1]}`),
    defaults: Object.fromEntries(
      defs.filter((x) => x[0] === id).map((x) => [x[1], `${id}::${x[1]}`]),
    ),
  }),
);
