# OopsTracker

> for humans who sometimes forget

A no-BS habit tracker. No streaks on fire, no confetti, no motivational quotes. Just your habits and whether you did them or not.

**Live:** [oopstracker.netlify.app](https://oopstracker.netlify.app)

---

## Stack

**Frontend** — Vanilla HTML/CSS/JS, deployed on Netlify  
**Backend** — Node.js, Express, deployed on Render  
**Database** — MongoDB Atlas  
**Auth** — JWT with bcrypt password hashing  

---

## Features

- Register and login with JWT auth
- Create habits with daily or weekly frequency
- Log a habit once per day
- Track current streak, best streak, and total logs
- Full log history per habit
- Rate limiting on auth routes

---

## Running locally

**Backend**

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5500
```

```bash
node index.js
```

**Frontend**

Open `frontend/index.html` in a browser or use Live Server. Make sure `API_BASE` in the script points to `http://localhost:8000`.

---

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |

### Habits
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/habits` | Get all habits |
| POST | `/habits` | Create a habit |
| GET | `/habits/:id` | Get habit by ID |
| PUT | `/habits/:id` | Update habit |
| DELETE | `/habits/:id` | Delete habit |

### Logs
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/habits/:id/log` | Log habit for today |
| GET | `/habits/:id/logs` | Get all logs for a habit |
| GET | `/habits/:id/streak` | Get current and best streak |
