# Reproducible public generator source stamp

Implemented without committing, publishing, performing network requests, executing a real source stamp, or regenerating catalog outputs.

## Files

- `scripts/stamp-generator-source.mjs`: standalone CLI and testable `verifySourceTree` / `stampGeneratorSource` exports. Requires an available full40-character lowercase commit SHA and the repository root. Uses argument-based `execFileSync` Git calls, one recursive NUL-delimited tree enumeration, and in-process Git blob hashing. Every authoritative local input must exist byte-for-byte in that tree; tree-owned portable skill files missing locally are also rejected. The frame manifest is checked as an additional input because its selected evidence contributes to the digest.
- `scripts/lib/generator-catalog.mjs`: shared `getKnowledgeResourcePaths`, `isKnowledgeSkillResource`, `FRAME_MANIFEST_PATH`, and `assertSourcePath` helpers. Existing builder APIs and digest construction remain intact. Paths reject absolute/traversal, `.git`, symlink, and nonregular-file inputs. Both the builder digest and stamp verifier use the same authoritative-resource enumeration.
- `tests/generator/source-stamp.test.mjs`: eight tests using disposable local Git repositories and injected fetch. Covers matching tree/public bytes, missing untracked source, modified guide/implementation, deleted portable resource, invalid/missing SHA, traversal/symlink sources, wrong repository root, excluded stamp/aggregate changes, public verification failures, and edits during public verification.

## Public verification and write boundary

The stamp CLI anonymously requests `SKILL.md` and `references/generator-handoff.md` from `https://raw.githubusercontent.com/Stianlars1/drawn-to/<SHA>/skills/drawn-to/...`, using `credentials: omit`, rejecting redirects, and applying a20-second request timeout. Response bytes must match the files already checked against the Git tree. It rechecks all source inputs after the network requests. Only after every check succeeds does it atomically replace `generator-release.json` with schema1, the immutable revision, `published: true`, and the current knowledge digest. Failed checks preserve the prior stamp.

## Verification

- RED: the new source-stamp tests initially failed because the CLI module did not exist.
- `node --test tests/generator/source-stamp.test.mjs`:8 passed.
- `node --test tests/generator/*.test.mjs`:43 passed.
- `node --check scripts/stamp-generator-source.mjs`:passed.
- No CI test needs network access.

## Integration command

After root commits and pushes all authoritative inputs, run `node scripts/stamp-generator-source.mjs <full-published-commit-SHA>`, then regenerate the final catalog with the existing builder. No final SHA was supplied or stamped by this task.


## Verified integration

Root executed the stamp against public source commit `8dbf7bc0e52a8c6c232f09ac63284bf072bbb088`. Both guide resources passed anonymous byte verification. The published generator catalog is `8035ea8cc5e752628a92`; its preceding beta catalog remains available for existing drafts.
