# Implementation Plan

> **Status:** Planned phases only. No phase is marked complete by this document.
> Follow phases in order unless inspection of the existing repository requires a documented adjustment.

## Phase 0 — Inspect workspace and establish baseline

### Tasks
1. Open the actual project folder in VS Code.
2. Inspect files, folders, `package.json` files, Git status, and existing implementation.
3. Read `PROJECT_ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, and `AI_HANDOFF.md` before making any changes.
4. Check whether React/Vite or Express/Mongoose already exists.
5. Preserve working code and note existing commands, ports, dependencies, and errors.
6. Create or reconcile the eight documentation files without overwriting useful existing documentation blindly.

### Exit criteria
- Actual repository structure is recorded.
- Existing app status is documented.
- No unverified claims about tests or implementation.

## Phase 1 — Initialize or stabilize the frontend

### Tasks
1. Use the existing frontend if one is present; otherwise create a React + JavaScript + Vite app in `frontend/`.
2. Verify the development server starts.
3. Establish global CSS reset, design tokens, typography, container widths, and responsive baseline.
4. Build the page shell and navigation.
5. Use semantic HTML and visible focus states.

### Verification
- Run the documented install/start command.
- Inspect browser console.
- Test basic mobile widths.
- Record exact results in `AI_HANDOFF.md`.

## Phase 2 — Build content sections with verified data

### Tasks
1. Add editable local data modules for profile, skills, projects, and timeline.
2. Build Hero, About, Skills, Projects, Experience/Education, Resume CTA, Contact section, and Footer.
3. Display projects from data rather than hardcoding repeated cards.
4. Support only the explicit project statuses `Completed` and `In Progress`.
5. Keep unconfirmed personal details as clearly marked local placeholders, not public-facing claims.
6. Add repository/demo links only after verifying them.
7. Add resume download only after the actual PDF is placed in the public assets path.

### Verification
- Confirm every required section is present.
- Confirm an in-progress project displays the correct label.
- Confirm no fabricated content is rendered.

## Phase 3 — Add 3D hero and motion

### Tasks
1. Install compatible versions of Three.js, React Three Fiber, Drei, and Motion for React.
2. Build a small, decorative hero scene.
3. Add WebGL/static fallback.
4. Respect reduced-motion preferences.
5. Add restrained section and hover animations.
6. Check bundle size and mobile behavior.

### Verification
- Scene loads without uncaught errors on a supported browser.
- Fallback appears if WebGL is unavailable or scene loading fails.
- Main text and links remain usable without the scene.
- Reduced-motion mode removes/reduces nonessential motion.

## Phase 4 — Build the Express API foundation

### Tasks
1. Initialize or inspect the backend app.
2. Configure Express, JSON parsing, CORS, Helmet, rate limiting, and error handling.
3. Add `/health` and `/api/v1/health`.
4. Add environment variable validation and a safe database connection module.
5. Keep controllers focused on HTTP behavior.

### Verification
- Start the server using the documented command.
- Test health endpoints in Postman or curl.
- Check malformed JSON and unknown routes.
- Record actual response codes and bodies.

## Phase 5 — MongoDB contact form

### Tasks
1. Create the `ContactMessage` Mongoose model.
2. Implement server-side contact validation.
3. Add `POST /api/v1/contact`.
4. Connect the frontend form to the API.
5. Implement loading, success, validation, rate-limit, and network-error states.
6. Optionally add SMTP delivery only when configuration and delivery behavior can be tested.

### Verification
- Submit a valid message and verify it was stored.
- Test missing name, invalid email, and too-short message.
- Test database unavailable behavior.
- Never claim email delivery if only database storage is implemented.

## Phase 6 — Optional database-backed projects

### Decision gate
Skip this phase if local project data meets the portfolio's needs.

### Tasks
1. Add Project schema and public list/detail endpoints.
2. Define how project content is populated without exposing an unauthenticated write endpoint.
3. Return only published projects.
4. Validate URL fields and project status.
5. Update the frontend data source once, avoiding duplicate sources of truth.

### Verification
- Test list, detail, unknown slug, status values, and unpublished project visibility.
- Do not create an admin API without authentication and authorization planning.

## Phase 7 — Quality, accessibility, and responsive polish

### Tasks
1. Review all viewport sizes.
2. Test keyboard navigation, focus states, forms, and reduced motion.
3. Check images, font loading, 3D fallbacks, and network failures.
4. Add basic SEO title/description, Open Graph metadata, favicon, and sensible page semantics.
5. Remove dead code, debug logs, and unused packages.
6. Check dependency warnings and build output.

### Verification
- Run available lint/build/test commands and record exact results.
- Fix high-priority console errors.
- Check that no secrets or private data are in Git.

## Phase 8 — Deployment and final review

### Tasks
1. Choose hosting for frontend, backend, and MongoDB.
2. Configure production environment variables and CORS.
3. Deploy backend, verify health/contact behavior, then deploy frontend.
4. Confirm HTTPS, resume URL, external links, and responsive behavior on the deployed site.
5. Document deployment URLs only after they exist and have been checked.

### Verification
- Test deployed endpoints and contact form.
- Check logs without exposing secrets.
- Update `README.md` and `AI_HANDOFF.md` with the real deployment status.

## Definition of done

- All required sections are complete with verified content.
- Project statuses are visible and accurate.
- Resume download points to a real file.
- Contact form works end-to-end with safe server validation and database persistence.
- 3D effects are tasteful, optional, responsive, and accessible.
- Main site remains useful when API/3D is unavailable.
- Actual build/test results are documented honestly.
- Documentation matches the implementation.

## AI change protocol

Before any code change:
1. Read `PROJECT_ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, and `AI_HANDOFF.md`.
2. Inspect relevant files and Git status.
3. State the smallest intended change.
4. Preserve existing working behavior.
5. Implement one coherent step at a time.
6. Run only tests that are relevant and available.
7. Update `AI_HANDOFF.md` with changed files, tests actually run, errors, pending tasks, and one exact next step.
