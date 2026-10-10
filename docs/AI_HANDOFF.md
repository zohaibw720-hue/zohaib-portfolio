# AI Handoff and Continuity Log

> **Current state:** Documentation drafted; application implementation has not started in the target VS Code workspace.
> **Last updated:** 2026-10-10

## 1. Mandatory instructions for every AI assistant

Before making changes, read these files in this order:
1. `PROJECT_ARCHITECTURE.md`
2. `IMPLEMENTATION_PLAN.md`
3. `AI_HANDOFF.md`

Then inspect the actual repository, relevant files, package manifests, and Git status before editing.

### Non-negotiable rules
- Do not assume a file exists just because it appears in `FOLDER_STRUCTURE.md`.
- Do not overwrite working code unnecessarily.
- Do not rebuild the project from scratch without first inspecting it and explaining why.
- Do not add fake experience, education, certificates, project details, metrics, client names, or URLs.
- Treat all features in architecture/plan documents as **planned** until they have been implemented and verified.
- Do not claim tests passed unless the test command/request was actually run and the result observed.
- Explain commands and important decisions in beginner-friendly language.
- Make small, reviewable changes.
- Keep secrets out of code, Git, screenshots, and documentation.
- Update this file after every implementation phase and after significant fixes.

## 2. Project brief

Build a modern, responsive dark 3D portfolio for a junior full-stack developer applying for jobs and internships.

Technology requested:
- React, JavaScript, HTML, CSS, Vite
- Three.js, React Three Fiber, Drei
- Motion for React
- Node.js, Express.js
- MongoDB, Mongoose
- Postman, Git, GitHub

Required sections:
- Hero
- About
- Skills and technologies
- Projects
- Experience or education where applicable
- Resume download
- Contact form
- Footer

Project status values:
- `Completed`
- `In Progress`

Do not invent personal details. Use local placeholders that are visibly marked for the owner to replace, and do not publish placeholder claims.

## 3. Feature status board

| Feature / area | Status | Notes |
|---|---|---|
| Architecture documentation | Planned/documented | Describes intended structure; verify against actual repo |
| Folder structure | Proposed | Target layout only |
| API contract | Planned | Endpoints are not implemented by this document |
| MongoDB schema | Planned | Models are not implemented by this document |
| Design system | Specified | CSS tokens and visuals still need implementation |
| React page | Not started | No implementation verified |
| 3D scene | Not started | No implementation verified |
| Express API | Not started | No implementation verified |
| MongoDB connection | Not started | No implementation verified |
| Contact form persistence | Not started | No implementation verified |
| Resume download | Pending real file | Must not link to a nonexistent file |
| Automated/manual tests | Not run | No test execution is claimed |
| Deployment | Not started | No deployment URL verified |

Update this table when evidence changes.

## 4. Environment and repository baseline

At the time this handoff file was drafted:
- The assistant did not have access to the user's local VS Code filesystem.
- No project files were attached to the conversation for inspection.
- The documentation package is a starting point; it has not been merged into an existing repository.
- Actual Node/npm versions, package versions, ports, scripts, Git status, and database configuration must be checked inside the target workspace before implementation.

Do not treat the proposed `frontend/` and `backend/` layout as confirmed until the workspace is inspected.

## 5. Change log

### 2026-10-10 — Initial documentation package
- **Completed:** Drafted architecture, target folder layout, API contract, schema plan, design system, implementation phases, AI continuity rules, and README.
- **Files changed:** Documentation files in the initial documentation package only.
- **Tests actually run:** None.
- **Errors encountered:** No application commands or tests were run.
- **Pending:** Copy the documentation into the actual project root; inspect the existing repository and reconcile the target structure.
- **Exact next step:** Open the real project folder in VS Code, inspect its files and Git status, then compare the existing workspace with `FOLDER_STRUCTURE.md` before creating or modifying application files.

## 6. Required phase update template

After every implementation phase, replace/update the relevant sections below. Do not leave a generic “done” note.

### Phase: [number and name]
- **Date:**
- **Status:** Not started / In progress / Blocked / Complete
- **Summary:**
- **Files created:**
- **Files modified:**
- **Files deleted:** (explain why; if none, say `None`)
- **Commands actually run:**
- **Tests actually run and observed results:**
- **Manual checks actually performed:**
- **Errors/warnings still present:**
- **Known limitations:**
- **Pending tasks:**
- **Exact next step:** one actionable instruction

## 7. Debugging protocol

When an error occurs:
1. Copy the exact error and identify the command or action that produced it.
2. Inspect the relevant file and surrounding configuration before editing.
3. Identify likely causes and test the smallest fix.
4. Avoid changing CSS while debugging backend/API logic unless styling is directly involved.
5. Avoid changing unrelated modules.
6. Re-run the failing check after the fix.
7. Record whether the error is resolved, remains, or was not retested.

Never describe an untested fix as confirmed.

## 8. Handoff summary for the next AI

You are continuing a planned portfolio project, not a verified existing implementation. First inspect the user's workspace. Read the architecture, implementation plan, and this handoff log. Preserve existing work, reconcile documentation with reality, and begin with Phase 0. Do not build every feature at once. After each phase, update this handoff log with exact evidence and the next step.
