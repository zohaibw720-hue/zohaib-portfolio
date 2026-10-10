# Project Architecture

> **Status:** Planning documentation only. No application code is implemented by this document.
> **Last updated:** 2026-10-10

## 1. Purpose

Build a premium, responsive 3D portfolio for a junior full-stack developer seeking entry-level jobs and internships. The site should present verified personal information, skills, real projects, education or experience where applicable, a resume download, and a contact form.

The portfolio must remain fast, accessible, mobile-friendly, and maintainable by a beginner. 3D effects should support the content rather than make it harder to read or use.

## 2. Technology decisions

### Frontend
- React with JavaScript and Vite.
- Semantic HTML and modular CSS.
- Three.js through `@react-three/fiber` and `@react-three/drei`.
- Motion for React for interface transitions and scroll/entrance animations.
- React Router is optional. Start with a single-page portfolio unless separate routes become useful.
- Fetch API for communication with the backend.

### Backend
- Node.js and Express.js.
- MongoDB with Mongoose.
- `dotenv` for local environment variables.
- `cors`, `helmet`, and `express-rate-limit` for appropriate API hardening.
- `express-validator` or a comparable schema validator for request validation.
- `nodemailer` is optional for contact email delivery, and must only be configured when SMTP credentials are available. The database can store contact submissions independently.

### Development and verification
- VS Code, Git, GitHub, npm, Postman.
- MongoDB Atlas or a local MongoDB instance.
- Separate frontend and backend environment files. Never commit secrets.

> Package versions should be chosen at implementation time and recorded in `package.json`/lock files. Do not assume that a package is installed until verified.

## 3. High-level architecture

```text
Visitor's browser
  |
  | React UI / CSS / Motion / optional 3D Canvas
  |
  | HTTPS JSON requests
  v
Express API
  |-- validation and sanitization
  |-- rate limiting and security middleware
  |-- route handlers
  |-- service/business logic
  |-- Mongoose models
  v
MongoDB
  |-- projects (optional database-backed content)
  |-- contact messages
```

The frontend should render a useful portfolio even if the API is unavailable. The first implementation may keep public profile, skills, experience, and project display data in local frontend data files, while the contact form uses the backend. If project management from an admin panel is added later, move project content into MongoDB through documented public/admin endpoints.

## 4. Frontend responsibilities

- Display the hero, about, skills, projects, experience/education, resume link, contact form, and footer.
- Keep content in small reusable components.
- Use data-driven rendering for skills, projects, education, and experience.
- Display project status as exactly `Completed` or `In Progress`.
- Distinguish optional or planned features from implemented features.
- Support loading, success, validation, network-error, and API-error states.
- Respect reduced-motion preferences and provide a fallback when WebGL is unavailable.
- Avoid putting important text inside a 3D scene.

Suggested component boundaries:
- `Navbar`
- `HeroSection`
- `AboutSection`
- `SkillsSection`
- `ProjectsSection` and `ProjectCard`
- `ExperienceEducationSection`
- `ResumeSection` or a resume CTA within the hero
- `ContactSection` and `ContactForm`
- `Footer`
- `SceneCanvas` and individual 3D objects (only if needed)

## 5. Backend responsibilities

- Expose a versioned JSON API under `/api/v1`.
- Validate and normalize contact form input on the server.
- Limit contact submissions to reduce spam.
- Store messages with timestamps and a processing status.
- Return consistent response shapes and appropriate HTTP status codes.
- Avoid returning private contact message details from public endpoints.
- Keep database connection and email credentials in environment variables.
- Log operational errors without exposing stack traces or secrets to visitors.

## 6. Data ownership and source of truth

Initial personal content can live in frontend files:
- `frontend/src/data/profile.js`
- `frontend/src/data/skills.js`
- `frontend/src/data/projects.js`
- `frontend/src/data/timeline.js`

Only add real, verifiable information. Use placeholders until details are confirmed. Do not invent employers, dates, degrees, certifications, metrics, testimonials, or project capabilities.

Backend database collections:
- `ContactMessage` is the minimum useful collection.
- `Project` is optional for the first version and becomes useful if portfolio content should be served by an API.
- `AdminUser` is out of scope unless an authenticated content-management feature is explicitly planned.

## 7. API and error conventions

Success example:

```json
{
  "success": true,
  "message": "Contact message received.",
  "data": {
    "id": "example-id"
  }
}
```

Error example:

```json
{
  "success": false,
  "message": "Please correct the highlighted fields.",
  "errors": [
    { "field": "email", "message": "Enter a valid email address." }
  ]
}
```

Never include stack traces, database credentials, or private server details in public responses.

## 8. 3D and animation performance rules

- Use one purposeful hero scene rather than many competing scenes.
- Keep geometry, materials, texture sizes, and draw calls modest.
- Avoid loading a large model before the first screen becomes usable.
- Use lazy loading or conditional rendering for nonessential 3D content.
- Provide a CSS/static fallback for devices without WebGL or with reduced motion.
- Stop or reduce continuous animation when the scene is not visible, where practical.
- Test on a mid-range mobile device and a narrow viewport.
- The website must remain navigable and legible with JavaScript 3D disabled.

## 9. Security and privacy

- Keep `.env` files out of Git.
- Validate all input on the server; frontend validation is only a convenience.
- Set CORS to known frontend origins in production.
- Apply rate limiting to contact submission.
- Use Helmet and JSON payload-size limits.
- Do not add authentication or an admin panel without a clear need.
- Do not publicly expose contact message lists or database identifiers.
- Add a privacy notice before collecting or retaining visitor information.

## 10. Deployment shape

Recommended separation:
- Frontend: static hosting such as Vercel or Netlify.
- Backend: Node-capable hosting.
- Database: MongoDB Atlas or another secured MongoDB deployment.
- Configure frontend API base URL and backend CORS through environment variables.
- Use HTTPS and production secrets in the host's secret manager.

Deployment provider selection is a future decision, not an implemented feature.

## 11. Definition of done

The portfolio is ready for review when:
- All sections render responsively.
- Content contains only verified personal information.
- Projects clearly show `Completed` or `In Progress`.
- Resume download works when a real file is provided.
- Contact API validates input and persists a valid message.
- Loading, success, and error states are accessible.
- 3D has a graceful fallback and does not block the content.
- Keyboard navigation, focus indicators, and reduced-motion support are checked.
- Commands and tests recorded in `AI_HANDOFF.md` were actually run.
