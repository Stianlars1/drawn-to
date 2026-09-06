# Release maintenance

The canonical source is `skills/drawn-to/` in `Stianlars1/drawn-to`. The same
repository publishes the static Vercel site and the Claude marketplace entry.
`npx skills` resolves the skill from this GitHub source; it is not a separate
hand-maintained package. Do not replace frozen benchmark snapshots or historical
release caches when updating active installations.

1. Validate the library with `python3 scripts/validate-library.py`. For a website
   change run the relevant checks in `docs/showcase.md` and inspect actual output.
2. Keep `metadata.version` in the skill entrypoint and `version` in
   `.claude-plugin/marketplace.json` aligned. Validate the marketplace using
   `claude plugin validate .claude-plugin/marketplace.json`.
3. Commit only the intended release. Fetch the remote first and preserve any
   unrelated local changes. Push, production deployment and release creation
   require the owner's authorization for that release.
4. Publish the exact checked commit to GitHub. Confirm the Vercel production
   deployment reaches Ready and the public alias serves the expected files and
   working scenes. A successful push alone is not deployment evidence.
5. Package the entire skill directory, retaining relative assets, references,
   source notices and metadata, under one `drawn-to/` folder in the release ZIP.
   Attach it to the versioned GitHub release. Keep historical releases intact.
6. Refresh registered installs with `npx skills update drawn-to --global --yes`.
   Refresh the Claude marketplace and installed plugin separately with the
   commands in README. Verify the active plugin path in its registry; do not
   infer the installed version from the marketplace checkout alone.
7. Compare the active skill folders to the canonical file set and hashes. Back
   up a manually maintained copy before replacing it. A different skill with
   the same name is a scope question, not automatically an outdated clone.

Record the commit, version, release URL, production URL, deployment status,
checked live behavior and updated installation paths in the delivery report.
Sessions may need restarting to load changed skill instructions.
