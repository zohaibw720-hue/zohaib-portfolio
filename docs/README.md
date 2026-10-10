# 3D Full-Stack Developer Portfolio

> **Project status:** Documentation-first planning stage. The website, API, database models, tests, and deployment are not implemented by these documents.

A planned professional, modern, responsive portfolio for a junior full-stack developer applying for entry-level roles and internships. The visual direction is dark and premium, with restrained blue, violet, and cyan accents, purposeful 3D effects, and smooth accessible motion.

## Planned technology stack

- **Frontend:** React, JavaScript, HTML, CSS, Vite
- **3D:** Three.js, React Three Fiber, Drei
- **Motion:** Motion for React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **API testing:** Postman
- **Version control:** Git and GitHub

Actual package versions and setup commands must be verified during implementation. This README does not mean any package has already been installed.

## Planned portfolio sections

- Hero section with role-focused message and calls to action
- About me
- Skills and technologies
- Projects with `Completed` or `In Progress` status
- Experience and/or education, when applicable and verified
- Resume download
- Contact form backed by an API
- Footer with relevant links

**Accuracy rule:** Do not invent personal qualifications, work history, project outcomes, metrics, or links. Use placeholders during development and replace them with verified details before publishing.

## Documentation map

| File | Purpose |
|---|---|
| `PROJECT_ARCHITECTURE.md` | System design, responsibilities, security, and deployment shape |
| `FOLDER_STRUCTURE.md` | Proposed repository layout and naming conventions |
| `API_DOCUMENTATION.md` | Planned endpoint contracts and Postman test plan |
| `DATABASE_SCHEMA.md` | Planned MongoDB/Mongoose data models |
| `DESIGN_SYSTEM.md` | Visual tokens, responsive rules, motion, 3D, accessibility |
| `IMPLEMENTATION_PLAN.md` | Phased implementation and exit criteria |
| `AI_HANDOFF.md` | Current status, continuity rules, test evidence, and next action |

## Start here when using an AI coding assistant

Before editing code, ask the assistant to read:
1. `PROJECT_ARCHITECTURE.md`
2. `IMPLEMENTATION_PLAN.md`
3. `AI_HANDOFF.md`

Then ask it to inspect the current repository and Git status before creating or changing files. The `FOLDER_STRUCTURE.md` is a proposal, not proof that every listed file exists.

## Setup requirements

Install or have access to:
- A current supported Node.js LTS release and npm
- VS Code
- Git
- MongoDB local instance or MongoDB Atlas account
- Postman for API verification
- A modern browser with developer tools

Do not assume versions or installation state. Check in the terminal:

```powershell
node --version
npm --version
git --version
```

These commands only report installed versions; they do not create or run the application.

## Planned development setup

The target layout separates `frontend/` and `backend/`. Exact commands depend on the actual repository state and chosen package versions. Follow `IMPLEMENTATION_PLAN.md` Phase 0 before running setup commands. If the project already exists, inspect it first rather than generating a second app over it.

After initialization, the expected workflow will generally be:
1. Install frontend dependencies inside `frontend/`.
2. Start the Vite development server.
3. Install backend dependencies inside `backend/`.
4. Create a private `backend/.env` based on `.env.example`.
5. Start the Express server.
6. Verify health and contact endpoints with Postman.
7. Run the available build/lint/test scripts and record the actual results.

Do not commit `.env` or secrets. Use `.env.example` for variable names only.

## Planned environment variables

Example names for the backend:

```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/developer_portfolio
CLIENT_ORIGIN=http://localhost:5173
```

These are examples for future configuration, not evidence that the API or database is running. Atlas connection strings and credentials must be private.

## Project status rules

Every project entry must include one status:
- **Completed** — the owner has confirmed it is finished and the displayed description matches the actual result.
- **In Progress** — development is still active or the project is incomplete.

Repository and live-demo links must be real and checked. Do not publish fake projects or placeholder links.

## Testing and quality

Planned checks include:
- Responsive layout at narrow and wide widths
- Keyboard navigation and visible focus
- Reduced-motion behavior
- 3D fallback behavior
- API validation and error responses
- Contact-message persistence in MongoDB
- Production build and available lint/test commands

**No tests are claimed as passed at the documentation stage.** Record each actual command/request and observed result in `AI_HANDOFF.md`.

## Implementation roadmap

1. Inspect the workspace and reconcile documentation.
2. Initialize/stabilize the frontend and design tokens.
3. Build sections using verified, data-driven content.
4. Add a lightweight 3D scene and accessible motion.
5. Build the Express API foundation.
6. Add MongoDB contact-message persistence.
7. Optionally add database-backed project endpoints.
8. Test accessibility, responsiveness, errors, and performance.
9. Deploy only after local behavior is verified.

See `IMPLEMENTATION_PLAN.md` for phase-by-phase tasks and exit criteria.

## Security and privacy

- Keep secrets out of source control.
- Validate inputs on the server.
- Rate-limit public contact submissions.
- Configure production CORS to trusted origins.
- Do not expose contact message records publicly.
- Add a clear privacy note if visitor messages are stored.
- Do not implement an admin panel or authentication unless it becomes an explicit requirement.

## License

Choose a license before publishing the repository. Do not imply that a license has been selected if it has not.
