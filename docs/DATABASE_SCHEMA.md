# Database Schema

> **Status:** Proposed Mongoose schemas. No models or database connection are implemented by this document.

## 1. Database plan

Suggested database name: `developer_portfolio`.

Minimum required collection:
- `contactmessages`

Optional collection:
- `projects` if portfolio content is served from MongoDB rather than local frontend data.

Personal profile, skills, education, and experience do not need database collections for the first version. Keep them in version-controlled frontend data until a content-management requirement justifies database storage.

## 2. ContactMessage model

### Purpose
Store messages submitted through the public contact form.

### Proposed fields

| Field | Type | Rules |
|---|---|---|
| `name` | String | Required, trimmed, 2–80 chars |
| `email` | String | Required, trimmed, lowercase, validated |
| `subject` | String | Optional, trimmed, max 120 chars |
| `message` | String | Required, trimmed, 10–5000 chars |
| `status` | String | Enum: `New`, `Read`, `Replied`, `Archived`; default `New` |
| `createdAt` | Date | Mongoose timestamps |
| `updatedAt` | Date | Mongoose timestamps |

Use Mongoose schema options `{ timestamps: true }`. A separate `createdAt` field should not be manually duplicated when timestamps are enabled.

### Indexing and retention
- Consider an index on `createdAt` for future administrative sorting.
- Do not make email unique; the same person may send more than one message.
- Set a documented retention policy before automatically deleting messages.
- Do not create a public endpoint that lists contact messages.
- If there is no authenticated admin interface, status fields can remain unused initially.

## 3. Optional Project model

Only implement this collection if the database becomes the chosen source of truth for project cards.

| Field | Type | Rules |
|---|---|---|
| `title` | String | Required, trimmed, 3–100 chars |
| `slug` | String | Required, lowercase URL-safe, unique |
| `summary` | String | Required, concise factual summary |
| `description` | String | Optional longer description |
| `technologies` | String array | Default empty array; deduplicate on write |
| `status` | String | Required enum: `Completed`, `In Progress` |
| `category` | String | Optional |
| `imageUrl` | String | Optional valid URL or local asset reference |
| `repositoryUrl` | String | Optional valid URL |
| `liveUrl` | String | Optional valid URL |
| `featured` | Boolean | Default `false` |
| `visibility` | String | Enum: `Draft`, `Published`; default `Draft` |
| `sortOrder` | Number | Default `0` |
| `createdAt` / `updatedAt` | Date | Mongoose timestamps |

### Project integrity rules
- Do not claim a project is completed unless the owner confirms it is complete.
- `In Progress` is a valid, visible status.
- Do not fabricate repository or deployment links.
- Public project queries must return only `Published` records.
- Use `slug` as a stable public identifier.
- Do not add fields for ratings, testimonials, performance metrics, or client outcomes unless verifiable and required.

## 4. Profile data: local-first recommendation

For the first version, use local files such as:
- `frontend/src/data/profile.js`
- `frontend/src/data/skills.js`
- `frontend/src/data/projects.js`
- `frontend/src/data/timeline.js`

Advantages:
- No database request is needed to display the core portfolio.
- Easy for a beginner to edit.
- The site can still show content if the backend is temporarily offline.
- Git history records content changes.

A later authenticated admin panel could move these records to MongoDB, but that is not part of the initial scope.

## 5. Environment variables

Backend `.env.example` should document variable names but contain no real credentials:

```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/developer_portfolio
CLIENT_ORIGIN=http://localhost:5173
# Optional email delivery, only if implemented:
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
# CONTACT_TO_EMAIL=
```

- `.env.example` may be committed.
- `.env` must be ignored by Git.
- If MongoDB Atlas is used, use a restricted database user and network access rules.
- Never paste connection strings or passwords into public documentation or commit history.

## 6. Failure and validation behavior

- If `MONGODB_URI` is missing, fail fast with a clear development error.
- Do not silently continue if contact storage is required but the database connection failed.
- Validate data at both the Express request boundary and Mongoose schema boundary.
- Return generic server errors to the client and log useful diagnostics on the server without secrets.
- Do not claim persistence works until a real insert and read/check have been verified.
