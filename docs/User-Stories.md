# SkillsTrack Learner Support Portal

## Problem Statement
SkillsTrack Training Centre currently manages learner goals, tasks, support requests, and progress using separate documents and messages. This makes it difficult for learners to track their work and for assessors to monitor progress.

The organisation requires a browser-based Learner Support Portal that centralises task management, support bookings, learner progress, and learning resources.

---

# Functional Requirements

## User Management
- Users must be able to register an account.
- Users must be able to sign in and sign out.
- The system must maintain an authenticated user session.

## Dashboard
- Display total tasks.
- Display completed tasks.
- Display outstanding tasks.
- Calculate and display learner progress percentage.

## Task Management
- Create tasks.
- View tasks.
- Edit tasks.
- Delete tasks.
- Mark tasks as completed.

## Support Session Booking
- Learners must be able to book support sessions.
- Booking forms must validate user input.
- Users must receive booking status feedback.

## Search and Filtering
- Users must be able to search tasks.
- Users must be able to filter tasks.
- Users must be able to sort tasks.

## User Preferences
- Store theme preference using cookies.
- Allow users to change display preferences.

## Progress Summary
- Generate printable progress summaries.

## Mini Game
- Users must be able to play a JavaScript learning game.
- Scores must be recorded.

## Database Integration
- Store data using Firebase Realtime Database.
- Support Create, Read, Update and Delete operations.
- Communicate using Firebase REST API.

---

# Non-Functional Requirements

- The application must be responsive.
- The interface must be user-friendly.
- User data must be secured through Firebase Authentication.
- Passwords must never be stored in cookies or the database.
- The application must use GitHub for version control.
- The application should load quickly and operate reliably.