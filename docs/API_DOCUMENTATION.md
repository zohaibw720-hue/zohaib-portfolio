# API Documentation

> **Status:** Contract proposed for implementation. These endpoints are not implemented or tested yet.
> **Base path:** `/api/v1`

## 1. Conventions

- Content type: `application/json`.
- Methods and paths are case-sensitive in practice; use the documented spelling.
- All timestamps returned by the API should use ISO 8601 UTC strings.
- Do not expose private contact messages through public routes.
- Frontend must show a clear loading, success, and failure state.
- The backend must validate every request regardless of frontend validation.

### Standard success response

```json
{
  "success": true,
  "message": "Request completed.",
  "data": {}
}
```

### Standard validation/error response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    { "field": "email", "message": "Enter a valid email address." }
  ]
}
```

Error responses should not include stack traces, database connection strings, secrets, or internal file paths.

## 2. Endpoint overview

| Method | Endpoint | Purpose | Public? |
|---|---|---|---|
| GET | `/health` | Confirm API process is responding | Yes |
| GET | `/api/v1/health` | Versioned health check, optionally includes database state | Yes, no secrets |
| POST | `/api/v1/contact` | Validate and store a contact message | Yes, rate-limited |
| GET | `/api/v1/projects` | List public projects if database-backed projects are enabled | Yes |
| GET | `/api/v1/projects/:slug` | Read one public project if enabled | Yes |

The project endpoints are optional for the first release if projects are served from frontend data. Do not implement both a local source and database source without clearly deciding which is authoritative.

## 3. GET `/health`

**Purpose:** Basic liveness check.

Example response, once implemented:

```json
{
  "success": true,
  "message": "API is running."
}
```

Recommended status: `200 OK`. This endpoint should not disclose environment variables or infrastructure details.

## 4. GET `/api/v1/health`

**Purpose:** Versioned health check. A database status may be returned as a coarse value such as `connected` or `disconnected`, but never expose the URI or credentials.

Possible response:

```json
{
  "success": true,
  "data": {
    "api": "ok",
    "database": "connected"
  }
}
```

If database state is not checked, omit the `database` field instead of pretending it was verified.

## 5. POST `/api/v1/contact`

**Purpose:** Accept a visitor's message and persist it to MongoDB.

### Request body

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "subject": "Internship opportunity",
  "message": "Hello, I would like to discuss..."
}
```

### Field rules

| Field | Required | Proposed rule |
|---|---|---|
| `name` | Yes | Trimmed string, 2–80 characters |
| `email` | Yes | Valid email, maximum 254 characters |
| `subject` | No | Trimmed string, maximum 120 characters |
| `message` | Yes | Trimmed string, 10–5000 characters |

Additional rules:
- Reject wrong data types and unexpected payload sizes.
- Normalize whitespace where appropriate; do not silently change the meaning of a message.
- Escape or safely render user-submitted text in any future admin UI.
- Apply rate limiting, and consider a honeypot or CAPTCHA only if spam becomes a real issue.
- Do not return the stored message body in the response.

### Success response

Status: `201 Created`

```json
{
  "success": true,
  "message": "Your message has been sent successfully.",
  "data": {
    "id": "generated-message-id"
  }
}
```

### Possible errors

- `400 Bad Request`: invalid fields.
- `413 Payload Too Large`: request body exceeds the configured limit.
- `429 Too Many Requests`: rate limit reached.
- `500 Internal Server Error`: unexpected server failure; return a generic message.

The frontend should not say an email was delivered unless email delivery is implemented and confirmed. The initial success message means the API accepted and stored the message.

## 6. GET `/api/v1/projects` (optional)

**Purpose:** Return projects intended for public display.

Possible query parameters:
- `status=Completed` or `status=In Progress`
- `limit` and `page` only if pagination is genuinely needed

Possible response:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "public-id",
        "title": "Verified Project Title",
        "slug": "verified-project-title",
        "summary": "A factual, concise summary.",
        "technologies": ["React", "Node.js"],
        "status": "In Progress",
        "liveUrl": null,
        "repositoryUrl": null,
        "featured": false
      }
    ]
  }
}
```

Only return public-safe fields. Omit unverified links rather than fabricating URLs.

## 7. GET `/api/v1/projects/:slug` (optional)

**Purpose:** Return one public project by slug.

- `200 OK`: project found and published.
- `404 Not Found`: no published project with that slug.
- Do not return draft/private projects.

## 8. API testing plan for Postman

Create a collection named `Developer Portfolio API` with an environment variable `baseUrl`, for example `http://localhost:5000`.

Test cases to add after implementation:
1. `GET {{baseUrl}}/health` returns the documented success response.
2. `POST {{baseUrl}}/api/v1/contact` with valid input returns `201`.
3. Contact submission with missing `name` returns `400`.
4. Invalid email returns `400`.
5. A too-short message returns `400`.
6. Repeated submissions eventually return `429` when the configured threshold is exceeded.
7. A database outage returns a safe error response.
8. If project endpoints are implemented, verify list/detail, status filtering, and `404`.

Record the actual date, command/request, result, and any failure in `AI_HANDOFF.md`. The list above is a plan, not evidence that tests have run.
