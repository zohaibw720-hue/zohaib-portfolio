# Folder Structure

> **Status:** Proposed structure. Create folders only after inspecting the existing workspace.
> This is a target layout, not evidence that files or features already exist.

## 1. Recommended repository layout

```text
developer-portfolio/
├── README.md
├── PROJECT_ARCHITECTURE.md
├── FOLDER_STRUCTURE.md
├── API_DOCUMENTATION.md
├── DATABASE_SCHEMA.md
├── DESIGN_SYSTEM.md
├── IMPLEMENTATION_PLAN.md
├── AI_HANDOFF.md
├── .gitignore
├── .editorconfig
├── docs/
│   └── (additional decisions, screenshots, deployment notes)
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── assets/
│   │   └── resume/
│   │       └── resume-placeholder.txt
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── app/
│       │   └── (providers or app-level configuration, if needed)
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.jsx
│       │   │   └── Footer.jsx
│       │   ├── sections/
│       │   │   ├── HeroSection.jsx
│       │   │   ├── AboutSection.jsx
│       │   │   ├── SkillsSection.jsx
│       │   │   ├── ProjectsSection.jsx
│       │   │   ├── ExperienceEducationSection.jsx
│       │   │   └── ContactSection.jsx
│       │   ├── projects/
│       │   │   └── ProjectCard.jsx
│       │   ├── contact/
│       │   │   └── ContactForm.jsx
│       │   ├── three/
│       │   │   ├── SceneCanvas.jsx
│       │   │   ├── HeroScene.jsx
│       │   │   └── WebGLFallback.jsx
│       │   └── ui/
│       │       ├── Button.jsx
│       │       ├── SectionHeading.jsx
│       │       └── StatusBadge.jsx
│       ├── data/
│       │   ├── profile.js
│       │   ├── skills.js
│       │   ├── projects.js
│       │   └── timeline.js
│       ├── hooks/
│       │   └── (custom hooks only when repeated logic exists)
│       ├── services/
│       │   └── api.js
│       ├── styles/
│       │   ├── tokens.css
│       │   ├── global.css
│       │   ├── layout.css
│       │   └── components/
│       ├── utils/
│       │   └── (small pure helpers)
│       └── assets/
│           ├── images/
│           └── models/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── config/
│       │   └── db.js
│       ├── routes/
│       │   ├── health.routes.js
│       │   ├── contact.routes.js
│       │   └── projects.routes.js
│       ├── controllers/
│       │   ├── health.controller.js
│       │   ├── contact.controller.js
│       │   └── projects.controller.js
│       ├── services/
│       │   ├── contact.service.js
│       │   └── project.service.js
│       ├── models/
│       │   ├── ContactMessage.js
│       │   └── Project.js
│       ├── middleware/
│       │   ├── notFound.js
│       │   ├── errorHandler.js
│       │   └── rateLimiters.js
│       ├── validators/
│       │   ├── contact.validator.js
│       │   └── project.validator.js
│       └── utils/
│           └── apiResponse.js
└── .github/
    └── workflows/
        └── (CI checks may be added later)
```

## 2. Structure guidance

- `frontend/` and `backend/` are separate npm applications. Run install commands in the relevant directory.
- Keep personal portfolio data in `src/data/` at first so the content is easy to edit without database setup.
- Keep API request code in `src/services/api.js`, not scattered across components.
- Keep shared CSS tokens in `src/styles/tokens.css`.
- Use `components/three/` for canvas-specific code so WebGL concerns remain isolated.
- Keep Express app configuration in `app.js`; start the listener in `server.js`. This makes app testing easier.
- Use `controllers/` for HTTP request/response handling and `services/` for business logic. For a very small app, avoid adding empty abstraction files before needed.
- Do not create `AdminUser`, authentication, file-upload, analytics, or blog modules unless they are approved as future scope.
- If an existing project uses a different structure, inspect it and adapt rather than forcing this layout onto working code.

## 3. Naming conventions

- React components: `PascalCase.jsx`, e.g. `ProjectCard.jsx`.
- Hooks: `useSomething.js`.
- Utilities and data modules: `camelCase.js`.
- Express route files: `resource.routes.js`.
- Mongoose model files: `PascalCase.js`.
- CSS files: `kebab-case.css` or a consistent existing convention.
- Environment variables: `UPPER_SNAKE_CASE`.

## 4. Files that must not be committed

At minimum, ensure `.gitignore` excludes:
- `node_modules/`
- `.env`, `.env.*` except `.env.example`
- build output such as `dist/`
- logs and temporary files
- editor/OS-specific files
- real private exports, credentials, or visitor data

A real resume is public-facing content if intentionally included; ensure it contains only information the owner wants published.
