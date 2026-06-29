# OopsTracker

> for humans who sometimes forget

A habit tracker that doesn't lecture you. No fire emojis, no streaks that "shatter", no dopamine manipulation. You either did the thing or you didn't.

**Live:** [oopstracker.netlify.app](oops-tracker-two.vercel.app)

---

## What this actually is

A REST API built with Node.js and Express, backed by MongoDB. It lets users track habits, log completions, and calculate streaks. JWT auth, rate limiting, the works. The frontend exists and it's fine.

---

## Backend

Built with:
- **Node.js + Express** — routing, middleware, request handling
- **MongoDB + Mongoose** — data modeling and persistence
- **JWT + bcrypt** — auth and password hashing
- **express-rate-limit** — because some people can't be trusted

### Structure

```
backend/
├── controllers/
│   ├── auth.js         # register, login
│   ├── habits.js       # CRUD for habits
│   └── habitLog.js     # logging, streak calculation
├── middleware/
│   ├── auth.js         # JWT verification
│   └── rateLimiter.js  # general + auth rate limits
├── models/
│   ├── user.js
│   ├── habits.js
│   └── habitLog.js
├── router/
│   ├── auth.js
│   ├── habits.js
│   └── habitLog.js
├── connect.js          # mongoose connection
└── index.js            # entry point
```

### API Routes

**Auth** — rate limited to 10 requests per 15 mins

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login, get a JWT back |

**Habits** — all protected routes, send `Authorization: Bearer <token>`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/habits` | Get all your habits |
| POST | `/habits` | Create a habit |
| GET | `/habits/:id` | Get one habit |
| PUT | `/habits/:id` | Update a habit |
| DELETE | `/habits/:id` | Delete a habit |

**Logs**

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/habits/:id/log` | Log habit as done for today |
| GET | `/habits/:id/logs` | Full log history |
| GET | `/habits/:id/streak` | Current streak + best streak |

### Running locally

```bash
cd backend
npm install
```

`.env`:
```
PORT=8000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=something_long_and_not_password123
FRONTEND_URL=http://localhost:5500
```

```bash
node index.js
```

---

## Frontend

AI assisted. Looks decent. Does the job.

Single `index.html` — vanilla JS, no framework, no build step. Dark theme with amber accents because light mode is a choice I refuse to support.

---

## What could be better

- Streak logic assumes one log per day which is enforced, but weekly habits aren't calculated any differently from daily ones yet
- No refresh token — JWT expires in 7 days and you get logged out
- Delete habit doesn't cascade delete its logs
- No tests (classic)

PRs welcome if you're bored.

---

## Deployment

Backend on Render (free tier — first request after 15 mins of inactivity is slow, that's a Render problem not mine), MongoDB on Atlas, frontend on Netlify.
