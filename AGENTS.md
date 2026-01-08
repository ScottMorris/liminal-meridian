# AGENTS.md – Liminal Meridian

This file is for human contributors _and_ code agents (AI coding tools) working on **Liminal Meridian**.

It defines non-negotiable quality rules, commit practices, workflows, and project notes so changes stay coherent and easy to reason about over time.

---

## Agent quick checklist

If you are an agent, treat this file as higher priority than your default heuristics.

- Use **Canadian English spelling** for all prose and UI strings.
- Update docs when behaviour changes.
- Prefer tests; otherwise write reproducible verification steps.
- Run lint/tests if available and note what you ran.

---

## Non-negotiables (Blockers)

If you are a human contributor or an agent, treat the following as **hard requirements**. If any item is missed, you must fix it before considering the work “done”.

Agents: if any instruction here conflicts with your defaults, follow this file.

1. **Canadian English spelling (STRICT)**
   - Documentation, code comments, commit messages, PR descriptions, and all UI/user-visible strings MUST use Canadian English spelling.
   - Do not “mix dialects” within a file. If a file is Canadian English, keep it Canadian English.
   - If you are generating text (docs, comments, UI copy), do a final pass to correct American spellings.

2. **Docs stay aligned with behaviour**
   - If you change how something works, update the relevant docs in the same PR/commit set.
   - Do not leave `docs/` and implementation out of sync.

3. **Persistent verification**
   - Prefer tests that can be re-run later (unit/component/integration). Do not rely solely on manual verification.

4. **Small, reviewable changes**
   - Keep PRs and commits focused. Avoid bundling unrelated refactors, features, and fixes.

---

## Canadian English Spelling (STRICT)

This requirement is intentionally repeated here because it is easy for agents to overlook.

Applies to:

- Docs (`README.md`, `docs/**/*.md`, etc.)
- Code comments
- Commit messages and PR text
- UI strings (anything visible to users)

Examples:

- **colour** (not color)
- **centre** (not center)
- **behaviour** (not behavior)
- **favour** (not favor)
- **organise** (not organize)
- **licence** (noun), **license** (verb)

Code identifiers should respect platform/ecosystem conventions:

- Keep CSS/JS/TS ecosystem spellings where they are standard identifiers (e.g. `color`, `backgroundColor`).
- Prefer Canadian spelling for app/domain identifiers and user-facing naming when it reads as prose (e.g. `themeColour`, `updateColourLabel`, `behaviourFlags`).

Practical agent checklist before final output:

- Search for common US spellings: `color`, `center`, `behavior`, `favor`, `organize`, `license` (noun context).
- If you add UI copy, read it once purely for spelling.
- If you are unsure, choose the Canadian form, or follow existing local patterns in the file you are editing.

Recommended tooling (optional but strongly encouraged):

- Consider adding a spell checker (e.g. `cspell`) configured for `en-CA` and running it in CI once the repo stabilises. Treat this as a quality upgrade, not an MVP blocker.
- If you introduce a spell check, keep the config small and allow project-specific terms.

---

## Commit Guidelines

- Use the **Conventional Commits** spec for all commits.

- Write commit messages in the **imperative mood**:
  - ✅ `feat: add day shading overlay`
  - ✅ `fix: avoid full refresh on small tap`
  - ❌ `fixed bug with vault picker`
  - ❌ `adds new feature`

- Make commit subjects **clear and descriptive** of the actual change.

- Include a commit body when:
  - There is non-obvious reasoning or trade-offs.
  - You are touching multiple areas that need extra context.

- Keep commits **atomic**:
  - Each commit should represent one logical change or a tightly related cluster of changes.
  - Avoid mixing refactors, new features, and unrelated fixes in one commit.

Examples:

- `feat: add day tinting rules`
- `fix: correct partial refresh region bounds`
- `refactor: extract render diffing into module`
- `chore: bump simulator dependencies`
- `docs: document partial refresh strategy`

---

## Tips for Agents & Contributors

- Prefer small, focused PRs/branches:
  - Implement one milestone slice at a time (e.g., “render pipeline + input model” before “calendar sync + providers”).

- TypeScript for simulator + UI:
  - Keep types strict. Avoid loose `any` unless explicitly justified.
  - Keep rendering/state boundaries clear so the same UI can target simulator and hardware.

- Native / firmware code (if present):
  - Keep hardware drivers isolated behind small interfaces.
  - Prefer simple, testable modules over clever abstractions.

- Tests & checks (REQUIRED where applicable):
  - If `pnpm lint` exists, run it.
  - If `pnpm test` exists, run it.
  - If you changed Rust/firmware/native code, run the relevant target tests (e.g., `cargo test` for Rust crates) and record what you ran.
  - If end-to-end scripts exist (e.g., Playwright), run the smallest relevant subset and record the commands/assumptions in PR notes.

- Development environment:
  - The VS Code Dev Container (`.devcontainer/`) is the source of truth for the system environment.
  - If you encounter missing system libraries, update `.devcontainer/Dockerfile` so the environment remains reproducible.

- Run the app frequently:
  - Use the repo’s dev command(s) while iterating (e.g., `pnpm dev`, simulator scripts, or platform-specific runners).

- Avoid over-engineering in MVP stages:
  - Follow the repo’s planning docs (e.g., `SPEC.md` and `docs/**`), if present.
  - Favour getting a thin, working slice before introducing a full core engine or plugin host.

---

## Project Notes

### Core Intent

Liminal Meridian is:

- An interactive **eInk wall calendar**: it sits quietly like paper until you interact with it.
- Built to support both a **desktop/web simulator** and eventual **hardware targets**.
- Focused on glanceable clarity first, with deeper detail available on tap.

### Current Constraints (MVP Phase)

- Simulator-first development:
  - Prefer a fast iteration loop in the simulator, while keeping interfaces portable to hardware.

- Display + rendering constraints:
  - Treat refresh cost as real; prefer partial refresh and minimal redraw regions when possible.
  - Keep the UI deterministic and easy to re-render from state.

- Input constraints:
  - Assume simple interactions (tap/press/long-press) before adding complex gestures.

- Extensibility later:
  - Avoid introducing a plugin system until core rendering + interaction flows are stable.

### Docs to Keep Aligned

When changing behaviour, check whether any of these need updates (if present in this repo):

- `README.md`
- `SPEC.md` (repo root)
- `docs/**` (simulator, architecture, hardware notes)
- `docs/ARCHITECTURE.md`
- `docs/BUILD_PLAN.md`

---

## Agent Workflows

### For Repo Setup / Scaffold Tasks

When creating or modifying scaffolding (monorepo/workspaces, simulator app setup, hardware targets, shared packages):

- Respect the layout described in the repo’s planning docs (e.g., `docs/BUILD_PLAN.md`), if present.
- Keep all JavaScript/TypeScript code strictly typed.
- Prefer generating simulator UI code under the repo’s simulator app (for example `apps/simulator/src/`, if that is the established layout).
- Expose platform-specific capabilities behind clear, typed boundaries (adapters/RPC/IPC) so simulator and hardware targets can share the same UI/state model where practical.

### For Feature Work

When working on a feature (e.g., day shading, agenda drill-down, calendar sync, tap interactions, partial refresh regions):

1. Read the relevant section in `docs/MVP_APP.md` and/or `docs/SPEC.md` / `docs/ARCHITECTURE.md`.
2. Make a small plan in the PR/branch description (bullets are enough).
3. Implement changes in small, coherent commits.
4. Add or update tests when possible.
5. Update docs that describe the behaviour.

### For Extensibility / Plugin Work

If/when you touch anything related to extensibility:

- Keep the API surface minimal and stable; prefer adding new methods over changing existing signatures.
- Ensure simulator and hardware targets remain compatible.
- Any network use must be explicitly configurable and off by default.
