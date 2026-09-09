# 🎓 ElevateHub — Online Learning Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![MUI](https://img.shields.io/badge/MUI-6.1-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.4-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-ISC-green)](LICENSE)

> A full-stack MERN course marketplace where instructors publish video courses and learners browse, enroll, watch, and discuss them — with role-based access control, profile management, and a light/dark themed Material UI interface.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#️-database-schema)
- [Application Routes](#-application-routes)
- [User Flows](#-user-flows)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Known Limitations](#-known-limitations)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ElevateHub** is a two-sided e-learning platform built on the MERN stack. It supports two distinct user roles with separate experiences driven by a single authentication flow:

- **Instructors** create and publish courses with attached video lessons
- **Learners** browse the catalog, add courses to a personal dashboard, watch lessons, and participate in per-course discussion threads

The app is split into two independently deployable services — a Create React App frontend and an Express REST API backed by MongoDB.

### What's Inside

✅ **Role-Based Access Control** — Route guards separate instructor and learner experiences
✅ **Course Authoring** — Instructors build courses with an unlimited list of video lessons
✅ **Personal Dashboard** — Learners curate their own enrolled-course library
✅ **Discussion Threads** — Per-course commenting with author attribution and timestamps
✅ **Profile Management** — Editable profiles with image upload via Multer
✅ **Dark Mode** — MUI theme toggle persisted to `localStorage`
✅ **Responsive Design** — Desktop nav collapses to a hamburger menu on mobile

---

## ⭐ Key Features

### 🔐 Authentication & Authorization
- **Signup with Role Selection**: Register as either `instructor` or `user`
- **Password Hashing**: `bcryptjs` with a salt round of 10
- **Session Persistence**: Redux state rehydrated from `localStorage` on page load
- **Protected Routes**: `<ProtectedRoute allowedRoles={[...]}>` wraps every authenticated page
- **Smart Redirects**: Root path routes instructors to `/home`, learners to `/courses`

### 📚 Course Management
- **Course Authoring** (instructor): Title, description, price, and a dynamic list of video lessons
- **Catalog Browsing**: Learners see every published course; instructors see only their own
- **Personal Dashboard** (learner): Add courses to a private library, remove them anytime
- **Course Player**: Hero banner, video lesson grid, and external video links

### 💬 Discussions
- **Threaded Comments**: Post comments on any course you can access
- **Author Attribution**: Populated user names via Mongoose `.populate()`
- **Timestamps**: Localized `createdAt` display on every comment
- **Scrollable Feed**: Fixed-height comment area with overflow scrolling

### 👤 Profile
- **View & Edit**: Update full name and email inline
- **Photo Upload**: Multipart image upload handled by Multer, served from `/uploads`
- **Avatar Fallback**: Auto-generated initials when no photo is set
- **Live Preview**: `URL.createObjectURL` preview before saving

### 🎨 UI & Theming
- **Material UI 6**: Cards, grids, app bar, menus, and form controls
- **Light/Dark Theme**: Custom palettes per mode, toggled from the navbar
- **Marketing Pages**: Home with featured courses, subscription plans, and testimonials; About Us with team bios and a contact form
- **Hover Animations**: Scale transforms and elevation shifts on course cards

---

## 🛠️ Tech Stack

### Frontend
```
React 18.3            UI library (Create React App 5)
React Router 7        Client-side routing
Redux Toolkit 2.4     Auth state management
MUI 6.1               Component library & theming
Axios 1.7             HTTP client
Formik + Yup          Form handling & validation
Bootstrap 5.3         Supplementary styling
```

### Backend
```
Node.js + Express 4   REST API server
MongoDB + Mongoose 8  Database & ODM
bcryptjs              Password hashing
Multer                Multipart file uploads
CORS                  Cross-origin requests
dotenv                Environment configuration
```

### Tooling
```
nodemon               Backend hot reload
react-scripts         Frontend dev server & build
Git                   Version control
```

---

## 📁 Project Structure

```
ElevateHub/
│
├── 📄 README.md                        # This file
│
├── ⚙️ backend/                         # Express REST API
│   ├── server.js                       # App entry — routes, CORS, Mongo connection
│   ├── package.json
│   ├── models/
│   │   ├── User.js                     # fullName, email, password, type
│   │   ├── Course.js                   # title, description, price, videos[]
│   │   └── Discussion.js               # courseId, userId, content, createdAt
│   ├── routes/
│   │   ├── userRoutes.js               # register, login, profile get/update
│   │   ├── courseRoutes.js             # add, get, dashboard, remove
│   │   └── discussionRoutes.js         # add comment, list by course
│   └── uploads/
│       └── profile_photos/             # Multer upload destination
│
└── 🎨 frontend/                        # React SPA
    ├── package.json
    ├── public/
    │   ├── index.html
    │   └── images/                     # 18 static assets (logo, heroes, team)
    └── src/
        ├── index.js                    # Redux Provider + root render
        ├── App.js                      # Router + role-gated route table
        ├── api/
        │   └── index.js                # Axios instance with baseURL
        ├── store/
        │   └── store.js                # Redux store + localStorage preload
        ├── slices/
        │   └── authSlice.js            # login / logout reducers
        ├── contexts/
        │   └── ThemeContext.js         # MUI light/dark theme provider
        ├── components/
        │   ├── Navbar.js               # Responsive app bar + profile menu
        │   └── ProtectedRoute.js       # Role-based route guard
        └── pages/
            ├── Home.js                 # Landing: featured courses, plans, testimonials
            ├── Aboutus.js              # Team bios + contact form
            ├── Login.js                # Email/password sign in
            ├── Signup.js               # Registration with role picker
            ├── Profile.js              # View/edit profile + photo upload
            ├── AddCourse.js            # Instructor course authoring
            ├── ViewCourses.js          # Course catalog
            ├── Dashboard.js            # Learner's enrolled courses
            └── WatchCourse.js          # Video player + discussion thread
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** — a local instance or a MongoDB Atlas connection string
- ~300 MB disk space for `node_modules`

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ElevateHub.git
cd ElevateHub
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Create the Uploads Directory

```bash
mkdir -p backend/uploads/profile_photos
```

> Multer does not create this directory automatically — profile photo uploads will fail without it.

---

## ⚡ Quick Start

### 1️⃣ Configure Environment

Create `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/elevatehub
PORT=4000
```

### 2️⃣ Start the Backend

```bash
cd backend
npx nodemon server.js
```

**Expected output:**
```
Server running on port 4000
MongoDB connected
```

### 3️⃣ Point the Frontend at Your API

The Axios base URL is currently hardcoded to the hosted backend. For local development, edit [frontend/src/api/index.js](frontend/src/api/index.js):

```js
const api = axios.create({
  baseURL: 'http://localhost:4000',
});
```

### 4️⃣ Start the Frontend

```bash
cd frontend
npm start
```

**Access at:** http://localhost:3000

### 5️⃣ Create Your First Accounts

1. Navigate to `/signup` and register as an **Instructor**
2. Log in, go to **Add Course**, and publish a course with a video URL
3. Log out, register a second account as a **User**
4. Browse **Courses**, click **Add to Dashboard**, then **Watch Course**

---

## 🔧 Environment Variables

| Variable | Location | Required | Description |
|----------|----------|----------|-------------|
| `MONGO_URI` | `backend/.env` | ✅ Yes | MongoDB connection string |
| `PORT` | `backend/.env` | ❌ No | API port (defaults to `4000`) |

> **Note:** The frontend has no `.env` support wired up — the API URL lives in [frontend/src/api/index.js](frontend/src/api/index.js). See [Known Limitations](#-known-limitations).

---

## 🔌 API Reference

Base URL: `http://localhost:4000`

### 👤 User Routes — `/user`

#### `POST /user/register`
Create a new account.

```json
// Request
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "type": "instructor"
}

// Response — 201
{ "message": "User registered successfully" }
```

#### `POST /user/login`
Authenticate and receive role + user ID.

```json
// Request
{ "email": "jane@example.com", "password": "secret123" }

// Response — 200
{
  "message": "Login successful",
  "role": "instructor",
  "userId": "674f2a1b9c8e4d0012ab34cd"
}
```

#### `GET /user/profile/:id`
Fetch a user profile by ID.

#### `PUT /user/profile/:id`
Update profile. Accepts `multipart/form-data` with fields `fullName`, `email`, and an optional `profilePhoto` file.

---

### 📚 Course Routes — `/course`

#### `POST /course/add`
Create a course (instructor) or add one to a learner's dashboard.

```json
{
  "title": "Intro to UI/UX",
  "description": "Design fundamentals from scratch.",
  "price": 49,
  "videos": [{ "title": "Lesson 1", "url": "https://..." }],
  "instructorId": "674f2a1b9c8e4d0012ab34cd",
  "userId": "674f2a1b9c8e4d0012ab34ce"
}
```

#### `GET /course/get?userId=&role=`
List courses. When `role=instructor`, returns only that instructor's courses; otherwise returns the full catalog.

#### `GET /course/get/:id?userId=&role=`
Fetch a single course. Instructors are restricted to courses they authored.

#### `GET /course/dashboard?userId=`
List the courses in a learner's dashboard.

#### `DELETE /course/remove/:id?userId=`
Remove a course from a learner's dashboard.

---

### 💬 Discussion Routes — `/discussion`

#### `POST /discussion/add`

```json
{
  "courseId": "674f...",
  "userId": "674f...",
  "content": "Great explanation in lesson 3!"
}
```

#### `GET /discussion/:courseId`
List all comments for a course, with `userId` populated to include `fullName`.

---

### 📁 Static Files

#### `GET /uploads/profile_photos/:filename`
Serves uploaded profile images.

---

## 🗄️ Database Schema

### `User`

| Field | Type | Constraints |
|-------|------|-------------|
| `fullName` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, bcrypt-hashed |
| `type` | String | Required, enum: `instructor` \| `user` |

### `Course`

| Field | Type | Constraints |
|-------|------|-------------|
| `title` | String | Required |
| `description` | String | Required |
| `price` | Number | Required |
| `videos` | Array | `[{ title, url }]` |
| `instructorId` | ObjectId | Required, ref → `User` |
| `userId` | ObjectId | Optional, ref → `User` (dashboard owner) |

### `Discussion`

| Field | Type | Constraints |
|-------|------|-------------|
| `courseId` | ObjectId | Required, ref → `Course` |
| `userId` | ObjectId | Required, ref → `User` |
| `content` | String | Required |
| `createdAt` | Date | Defaults to `Date.now` |

### Relationships

```
User (instructor) ──1:N──> Course ──1:N──> Discussion
                                              │
User (learner) ────1:N──> Course              │
       └──────────────────1:N─────────────────┘
```

---

## 🧭 Application Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/login` | `Login` | Public | Email/password sign in |
| `/signup` | `Signup` | Public | Registration with role selection |
| `/home` | `Home` | 🔒 Both | Landing page with featured content |
| `/about-us` | `Aboutus` | 🔒 Both | Team bios and contact form |
| `/courses` | `ViewCourses` | 🔒 Both | Course catalog |
| `/watch/:id` | `WatchCourse` | 🔒 Both | Video lessons + discussions |
| `/profile` | `Profile` | 🔒 Both | View and edit profile |
| `/add-course` | `AddCourse` | 🔒 Instructor | Course authoring form |
| `/dashboard` | `Dashboard` | 🔒 Learner | Enrolled course library |
| `/` | — | Redirect | Instructor → `/home`, learner → `/courses`, guest → `/login` |
| `*` | — | Redirect | Falls back to `/` |

---

## 🔄 User Flows

### Instructor Flow

```
Signup (type: instructor)
        ↓
     Login  ──→  Redux stores { role, userId } + localStorage
        ↓
    /home (landing)
        ↓
   /add-course  ──→  Fill title, description, price
        ↓              Add video lessons one at a time
        ↓
   POST /course/add  ──→  Course saved with instructorId
        ↓
   /courses  ──→  Sees only own courses
        ↓
   /watch/:id  ──→  Preview lessons + read discussions
```

### Learner Flow

```
Signup (type: user)
        ↓
     Login
        ↓
   /courses  ──→  Sees full catalog
        ↓
  "Add to Dashboard"  ──→  POST /course/add with userId
        ↓
   /dashboard  ──→  GET /course/dashboard?userId=
        ↓
  "Watch Course"  ──→  /watch/:id
        ↓
   Video grid + comment thread
        ↓
  "Post Comment"  ──→  POST /discussion/add
```

---

## 🚢 Deployment

The app is currently split across two hosts:

| Service | Platform | Notes |
|---------|----------|-------|
| **Backend** | Render | `https://webdesign-final-grp8.onrender.com` |
| **Frontend** | Static host | Build output from `npm run build` |
| **Database** | MongoDB Atlas | Connection via `MONGO_URI` |

### Build for Production

```bash
cd frontend
npm run build
```

Outputs an optimized bundle to `frontend/build/`.

### Deployment Checklist

- [ ] Set `MONGO_URI` in the backend host's environment settings
- [ ] Update the Axios `baseURL` to the deployed API origin
- [ ] Restrict CORS to your frontend domain (currently wide open)
- [ ] Move uploads to object storage — Render's disk is ephemeral
- [ ] Replace the hardcoded `http://localhost:4000` avatar URL in [Profile.js](frontend/src/pages/Profile.js)

---

## 🐛 Troubleshooting

### `MongoDB connection error`

```bash
# Verify the connection string is loaded
cd backend && node -e "require('dotenv').config(); console.log(process.env.MONGO_URI)"

# For local MongoDB, confirm the service is running
brew services list | grep mongodb
```

### Profile photo upload fails silently

```bash
# Multer requires this directory to exist
mkdir -p backend/uploads/profile_photos
```

Note that even with the directory present, `profilePhoto` is not declared on the `User` schema, so Mongoose strips it. See [Known Limitations](#-known-limitations).

### Frontend requests hit the wrong server

The base URL is hardcoded in [frontend/src/api/index.js](frontend/src/api/index.js). Change it to `http://localhost:4000` for local work.

### CORS errors in the browser console

`cors()` runs with no options, so all origins are allowed. If you still see errors, the backend is likely not running — check that port 4000 responds.

### Port 3000 or 4000 already in use

```bash
# Frontend on a different port
PORT=3001 npm start

# Find and kill whatever holds port 4000
lsof -ti:4000 | xargs kill -9
```

### Course hero image doesn't load

The file is `Course-hero.jpg` but [WatchCourse.js](frontend/src/pages/WatchCourse.js) requests `course-hero.jpg`. This works on macOS but breaks on case-sensitive filesystems — rename one to match.

---

## ⚠️ Known Limitations

These are real gaps in the current build, documented for transparency:

| Issue | Impact | Location |
|-------|--------|----------|
| **No API authentication** | `jsonwebtoken` is installed but never used. Login returns no token, and every route trusts `userId`/`role` from query params. Auth is enforced client-side only. | All backend routes |
| **Enrollment duplicates courses** | "Add to Dashboard" `POST`s a full copy of the course document instead of creating an enrollment record. Repeat clicks create duplicates. | [ViewCourses.js:44](frontend/src/pages/ViewCourses.js#L44) |
| **`profilePhoto` missing from schema** | The update route sets the field, but Mongoose strips undeclared paths — uploads never persist. | [models/User.js](backend/models/User.js) |
| **Hardcoded API URL** | No env-var support on the frontend; local development requires a code edit. | [api/index.js](frontend/src/api/index.js) |
| **Hardcoded localhost avatar** | Profile avatars point at `http://localhost:4000`, breaking in production. | [Profile.js:100](frontend/src/pages/Profile.js#L100) |
| **Not a standalone git repo** | The project sits inside a repository rooted at the user's home directory; no ElevateHub file is tracked. Needs its own `git init`. | Repo root |
| **Stripe unused** | The dependency is installed but no payment flow exists — prices are display-only. | `backend/package.json` |
| **Duplicate route guard** | `ProtectedRoute` is defined both in [App.js](frontend/src/App.js) and [components/ProtectedRoute.js](frontend/src/components/ProtectedRoute.js); only the inline copy is used. | Frontend |

---

## 🎯 Roadmap

- [ ] Issue JWTs on login and add auth middleware to every protected route
- [ ] Replace course duplication with a dedicated `Enrollment` model
- [ ] Add `profilePhoto` to the `User` schema
- [ ] Move the API base URL into `REACT_APP_API_URL`
- [ ] Initialize ElevateHub as its own git repository with a root `.gitignore`
- [ ] Wire up Stripe checkout for paid courses
- [ ] Upload and stream video files instead of storing external URLs
- [ ] Track lesson completion and course progress
- [ ] Add course search, categories, and filtering
- [ ] Ratings and reviews (the star UI is already stubbed out in `Dashboard.js`)
- [ ] Instructor analytics — enrollments and revenue
- [ ] Email verification and password reset

---

## 📊 Project Statistics

```
📝 Frontend Source:      2,408 lines (JS + CSS)
⚙️ Backend Source:       297 lines
🎨 React Pages:          9
🧩 Shared Components:    2
🗄️ Mongoose Models:      3
🔌 API Endpoints:        9
🖼️ Static Assets:        18 images
📦 Frontend Deps:        18
📦 Backend Deps:         9
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Terminal 1 — backend with hot reload
cd backend && npx nodemon server.js

# Terminal 2 — frontend dev server
cd frontend && npm start
```

### Code Style

- Functional React components with hooks
- MUI `sx` prop preferred over inline `style` for new components
- Async/await with try/catch for all API calls
- Redux Toolkit slices for shared state; `useState` for local state

---

## 📄 License

This project is licensed under the ISC License.

---
