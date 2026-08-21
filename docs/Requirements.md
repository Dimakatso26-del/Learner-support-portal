# User Story 1 Requirements
- Given I am on the registration page, when I enter valid email + password, then a new user account is created in firebase authentication
- Given I enter invalid details, when I submit, then i see error message
- Given I am registered, when I sign in,then I am re-directed to the dashboard

# User Story 2 Requirements
- Given I am on the dashboard, when I fill the "Add Task" form and click save, then the task is stored in firebase realtime database
- Given I submit with emty title, when I click save, then I see validation error
- Given the task is saved, when I return to dashboard, then I see the new task in my list

# User Story 3 Requirements
- Given I have tasks, when i load the dashboard, then I see total tasks, completed tasks and outstanding tasks
- Given tasks are completed or pending, when dashboard loads, then progress % is calculated using completed/total * 100
- Given no tasks exist, when dashboard loads, then progress shows 0%

# User Story 4 Requirements
- Given I click "Mark Complete" on a task, when confirmed, then the task status updates to Completed: true in firebase
- Given I click "Delete" on a task, when I confirm in the dialog, then the task is removed from firebase and the UI
- Given I edit a task, when I save changes, then the updated data is reflected immediately

# User Story 5 Requirements
- Given I fill the booking form with topic + date, when I submit, then the booking is saved to firebase with status "Pending"
- Given I submit invalid date, when I click submit, then I see validation error
- Given booking is successful, when I submit, then I see a success message

# User Story 6 Requirements
- Given I type in the search bar, when I press enter, then only tasks matching the keyword are displayed
- Given I select "Completed" filter, when applied, then only completed tasks show
- Given I choose "Sort by Due Date", when selected then tasks are re-ordered using array sort()
# SkillsTrack Learner Support Portal

## Problem Statement

SkillsTrack Training Centre currently manages learner goals, tasks, support requests and learner progress using separate documents and messages. This makes it difficult for learners to track their work and for assessors to monitor learner performance.

The organisation requires a browser-based Learner Support Portal that centralises task management, support bookings, learner progress tracking and learning resources. 

---

# Project Scope

The system will allow learners to:

- Register and sign in.
- Manage learning tasks.
- Book support sessions.
- Track learning progress.
- Search and filter tasks.
- Store preferences using cookies.
- Print progress summaries.
- Play a JavaScript learning game.

The system will allow assessors to:

- View learner activity.
- Review support bookings.
- Update booking statuses where required. 

---

# Functional Requirements

## Authentication
- User registration
- User login
- User logout
- Authenticated user sessions

## Dashboard
- Show total tasks
- Show completed tasks
- Show outstanding tasks
- Calculate progress percentage

## Task Management
- Create tasks
- Read tasks
- Update tasks
- Delete tasks
- Mark tasks as completed

## Support Booking
- Create support bookings
- Validate booking information
- Display status feedback

## Search and Filtering
- Search tasks
- Filter tasks
- Sort tasks

## User Preferences
- Store theme preference in cookies
- Load saved preferences

## Progress Reports
- Generate printable progress summaries

## Mini Game
- Play JavaScript learning game
- Store game scores

## Firebase Integration
- Store data using Firebase Realtime Database
- Perform CRUD operations
- Use REST API requests

---

# Non-Functional Requirements

- Responsive design
- Secure authentication
- Easy-to-use interface
- Reliable performance
- Version control using GitHub
- Secure storage of user data
