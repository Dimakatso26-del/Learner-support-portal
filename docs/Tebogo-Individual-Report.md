# Individual README, Contribution Report and Reflection

**Learner:** Tebogo Mnguni
**Project:** SkillsTrack Learner Support Portal (JavaScript Programmer Skills Programme, SP-220373)
**Branch:** `tebogo`
**Team:** Tebogo Mnguni, Dimakatso Mosima, Senzokuhle Ngubane

---

## 1. About my part of the project

The portal lets learners manage tasks, book support sessions, play a coding quiz and track progress, while assessors see every learner's progress and manage bookings. It is built with HTML, CSS and JavaScript (ES6 modules) and uses Firebase Authentication and the Firebase Realtime Database.

My responsibility was the foundation the rest of the app depends on: the Firebase project and security rules, authentication, the object-oriented design, error handling and validation. Close to the deadline the Student and Assessor pages were still static HTML/CSS layouts, so I also connected those pages to Firebase. The page layouts themselves (HTML and CSS) were designed and written by Dimakatso (student pages) and Senzokuhle (assessor pages).

## 2. What I built

| Area | Files | What it does |
|---|---|---|
| Firebase project and rules | Firebase console | Realtime Database in locked mode, Email/Password sign-in, rules that stop one user reading or writing another user's data |
| Authentication | `src/auth.js`, `src/session.js`, `src/login.html`, `src/login.js`, `src/register.html`, `src/register.js` | Register, sign in, sign out, role check (Student or Assessor), page protection that redirects signed-out visitors |
| OOP design | `src/models.js` | `User`, `Learner`, `Assessor`, `Task` classes and a `createUserFromProfile()` factory |
| Error handling | `src/errors.js`, `try/catch/finally` in `src/auth.js` | Custom `AppError` class with an error code, used across auth, models and the REST calls |
| Validation | `src/validation.js` | Name, email, password strength, South African ID number, contact number, password match |
| Styling | `src/styles.css` | Shared stylesheet for the login and register pages |
| REST helper | `src/api.js` | `fetch` wrapper that sends the signed-in user's token with every request |
| Student pages | `src/dashboard-student.js`, `src/tasks.js`, `src/support.js`, `src/settings.js`, `src/game.js` | Live dashboard counts, task create/read/update/delete, support booking form, cookie preferences, timed quiz with a leaderboard |
| Assessor pages | `src/assessor-data.js`, `src/dashboard-assessor.js`, `src/students-assessor.js`, `src/bookings-assessor.js`, `src/settings-assessor.js` | Learner progress, search/filter/pagination, confirm/decline/reschedule/cancel bookings |
| Preferences | `src/preferences.js` | Cookie helpers (set, read, delete) for theme, font weight and landing view |

## 3. How to run my part

1. Clone the repository and switch to the `tebogo` branch.
2. Create `src/firebase-config.js` (it is in `.gitignore` and not in the repository). Copy the web app config from Firebase console, Project settings, General, Your apps, and paste it into this file with `initializeApp(firebaseConfig)` exported as `app`.
3. Open `src/login.html` with the VS Code **Live Server** extension. The pages use ES modules, so they will not work when opened by double-clicking the file.
4. Register a new Student or Assessor account, then sign in.

## 4. Firebase data model

```
users/{uid}        firstName, lastName, email, role, idNumber, contactNumber, createdAt
tasks/{taskId}     userId, title, category, dueDate, completed, createdAt
bookings/{id}      userId, userName, topic, preferredDate, preferredTime, notes, status, createdAt
scores/{id}        userId, userName, score, correctCount, duration, passed, completedAt
```

Every record that belongs to a learner carries a `userId`, which is the Firebase Authentication uid. This is how one learner's data is kept apart from another's.

**Security rules (summary):**
- `users`: a user can read and write only their own record. Assessors can read all users.
- `tasks`: a learner can read only tasks where `userId` equals their uid, and can write only their own tasks. Assessors can read all tasks.
- `bookings`: learners read and create their own. Assessors can read all and update status.
- `scores`: any signed-in user can read; a score can only be created for your own uid.
- Nothing is writable without authentication.

## 5. REST API usage (Firebase Realtime Database)

The Tasks page talks to the database through its REST API, authenticated with the user's ID token. After every change the page makes another GET so the list always shows what is really stored.

| Method | Endpoint | Used for |
|---|---|---|
| GET | `/tasks.json?orderBy="userId"&equalTo="<uid>"` | Load my tasks |
| POST | `/tasks.json` | Create a task |
| PATCH | `/tasks/<id>.json` | Edit a task, tick or untick it |
| DELETE | `/tasks/<id>.json` | Delete a task (after a confirm box) |
| PUT | `/users/<uid>.json` | Restore a profile if account deletion fails |

The same helper (`src/api.js`) is used for bookings, scores and user profiles.

## 6. Object-oriented design

- `User` holds what every account shares: `uid`, `firstName`, `lastName`, `email`, `role`.
- `Learner extends User` adds `idNumber`, `contactNumber` and a `tasks` array, with methods for completed, outstanding and overdue tasks and the completion percentage.
- `Assessor extends User` adds `contactNumber` and `assignedLearners`, with `getLearnersAtRisk()`.
- `Task` is linked to its owner by `userId` (composition: a learner has tasks).
- `createUserFromProfile(uid, profile)` turns a stored profile into the right class based on `role`.

## 7. Error handling and validation

- `AppError extends Error` carries a `code` (for example `validation/missing-title` or `auth/email-already-in-use`) as well as a message, so code can react to the kind of failure.
- `registerUser()` and `loginUser()` use `try/catch/finally` and throw `AppError` with friendly messages.
- Constructors and methods in `models.js` throw `AppError` on bad input (empty task title, invalid due date, wrong object type).
- Forms are validated on the client before any request is sent. This is for fast feedback only. The database security rules are the real enforcement, because client-side checks can be bypassed.

## 8. Collaboration and Git

- Each learner works on their own branch; mine is `tebogo`.
- My work reaches `main` through pull requests from `tebogo`, reviewed and merged by a teammate.
- `src/firebase-config.js` is listed in `.gitignore` so credentials stay out of GitHub. It had been committed once by mistake; I removed it from tracking with `git rm --cached`.
- Integration issue resolved: pushes to `tebogo` were rejected twice because my local branch and the remote had diverged after my teammates' commits landed on the same branch. I pulled again, finished the merge commit and pushed. Later, "Merge main into tebogo and resolve conflicts" (commit `6db1a82`) brought `main` into my branch before pull request #76.

## 9. Contribution report

**Assigned to me (Month 2 plan):** Firebase setup and security rules, authentication, OOP structure, error handling, client-side validation.

**Completed:** all five of the above, tested for both the Student and Assessor roles.

**Additional work I took on:** connecting the static Student and Assessor pages to Firebase (dashboards, tasks, support bookings, settings, game, learner list, bookings management), because those pages had layout only and no JavaScript. Layouts and CSS for these pages were written by my teammates.

**Evidence in Git:**
- Pull request #72 (`tebogo` into `main`): 9 commits, approved by Senzokuhle12-git, merged.
- Pull request #76 (`tebogo` into `main`): 7 commits, review requested from Senzokuhle12-git, merged.
- Peer review: Senzokuhle12-git reviewed my work through these pull requests.
- This document is issue #65.

## 10. Problems I found and fixed

| Problem | How I diagnosed it | Fix |
|---|---|---|
| Register and login forms did nothing; the page just refreshed | Browser console: "Failed to resolve module specifier firebase/app" | Switched all Firebase imports to the CDN module URLs so the browser can load them without a bundler |
| Assessor registration silently read the Student form's fields | Reasoned from `getElementById` returning the first match | Gave the Assessor inputs their own unique ids |
| `firebase-config.js` was in `.gitignore` but still pushed | `git status` showed it as modified | `git rm --cached` so Git stopped tracking it |
| Push rejected twice ("tip of your branch is behind") | `git status` showed local and remote had diverged | Pulled again, finished the merge commit, pushed |
| Student dashboard showed hardcoded numbers | Compared the page with the Tasks page for the same account | Gave each number an id and filled it from Firebase |
| Dashboard file overwritten with an error message | Viewed the page source | A pasted terminal command lost its first letter; recreated the file through VS Code |

## 11. Known gaps

- The quiz game uses plain JavaScript timers. The brief asks for an assessor-approved framework or library (Phaser or Kaboom), which has not been added yet.
- There are no automated tests and no GitHub Actions workflow yet (the pull requests show 0 checks).
- `src/tasks.js` contains its own copy of the REST helper; it should be switched to the shared `src/api.js`.
- Student and Assessor pages use separate stylesheets; they should be merged into one shared file.

## 12. Reflection

At the start I thought the hard part would be the code. It turned out the hard parts were setup and communication. Getting Firebase, security rules and authentication working first mattered, because my teammates could not connect their pages to real data until that existed.

The biggest thing I learned was why things fail, not just how to write them. The bare `firebase/app` import taught me that a browser and a bundler resolve imports differently. The Assessor form bug taught me that ids must be unique on a page. The `.gitignore` problem taught me that ignoring a file does not stop Git tracking one that was already committed.

I also learned about security. Hiding the Firebase config is not what protects the data; the database rules are. Client-side validation helps users, but it can always be bypassed, so the rules have to do the real enforcement.

On teamwork, I found out late that the Student and Assessor pages were layout only, with no JavaScript behind them. If I did this again I would check each other's progress in week one and agree file names, field names and one shared stylesheet before anyone wrote code. I would also add automated tests and use Phaser for the game.

I can explain my own code (authentication, models, errors, validation, the REST helper and the tasks page) and I understand how the pages my teammates designed connect to it.

## 13. Sources and acknowledgements

- Firebase documentation: Authentication, Realtime Database rules and the REST API.
- MDN Web Docs: `fetch`, ES modules, cookies, `Date`.
- AI assistance: I used an AI assistant (Claude) to help plan the architecture, scaffold code, find errors and draft this document. I tested the code, reviewed what it produced and edited it, and I am able to explain it.
- Page layouts, HTML and CSS for the Student pages: Dimakatso Mosima. For the Assessor pages: Senzokuhle Ngubane.