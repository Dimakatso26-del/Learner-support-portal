# SkillsTrack Student Support Portal

## Project Overview

A web-based academic assistance and learner management system, the SkillsTrack Learner support Portal is intended to let learners and assessors communicate, track progress, manage tasks, schedule support, and engage in game-based learning.

There are two main user roles available on the platform:

1. Students or Learners
2. Academic Support Staff Assessors

While assessors may review academic progress, administer support sessions, and keep an eye on learner performance, students can use the system to manage coursework, track progress, take part in coding challenges, and ask for academic help.

_______________________________
## System Objectives

The system's main goals are:

- Learner support services should be gathered in one place
- Improve student involvement.
- Monitor academic achievement and project performance.
- Encourage communication between assessors and students.
- Schedule and manage support sessions.
- Games should be used to promote interaction.
- Give management and assessors analytical data.

________________________________
## User Roles

### Students

Students can:

- Create an account.
- Open the portal and log in.
- Examine academic dashboards.
- Track assignment progress.
- Manage a number of tasks.
- Schedule assistance sessions.
- Take part in coding challenges.
- Update and modify your accessibility preferences and profile settings.

### Assessors

Assessors are able to:

- Log in to the platform after registering.
- Keep an eye on students' performance.
- Examine learner progress reports.
- Monitor support bookings.
- Assess system analytics.
- Set up the notification settings.

_________________________________
## Functional Requirements 

### Authentication Module 

#### Student Registration

The system shall allow students to:

- Enter personal information.
- Capture contact details.
- Create secure passwords.
- Register new accounts.

#### Student Login

The system shall:

- Authenticate registered learners.
- Validate user credentials.
- Redirect successful users to the learner dashboard.

#### Assessor Registration 

The system shall allow assessors to:

- Create assessor accounts.
- Capture professional contact details.
- Access assessor-specific functionality.

#### Assessor Login

The system shall:

- Authenticate assessors.
- Authorize access to assessor dashboards.

__________________________________
## Learner Dashboard 

The learner dashboard provides an overview of:

- Total tasks.
- Completed tasks.
- Outstanding tasks.
- Overdue tasks.
- Recent activities.
- Learning summaries.

Features include:
- Real-time progress indicators.
- Academic performance summaries.
- Personalized task notifications.

________________________________

## Task Management Module

Learners can:

### View Tasks

- Browse assigned tasks.
- View deadlines.
- Identify overdue work.

### Search Tasks


- Search using task names.
- Filter by categories.

### Manage Tasks

- Add tasks.
- Sort tasks.
- Review task status.

### Empty-State Handling

When no tasks match search criteria:

- Display "No Tasks Found"
- Provide filter reset functionality. 

---

## Progress Tracking Module


The system maintains learner academic records through:


### Progress Reports

- Completion percentages.
- Pass rates.
- Subject-level performance.

### Module Tracking

Examples include:

- Computing Fundamentals
- Thinking Like a Programmer
- Coding Basics with JavaScript

Performance classifications:

- Passed
- In Progress
- At Risk
- Exceeds Expectations
- Needs Attention

---

## Support Session Booking Module

Learners may request academic assistance by:

1. Selecting a topic or module.
2. Choosing a preferred date.
3. Selecting a preferred time.
4. Submitting support notes.

Support bookings contain:

- Topic
- Date
- Time
- Booking status

Possible booking statuses include:


- Pending
- Confirmed
- Completed

---

## Gaming Module

The portal includes a coding challenge system that promotes learner engagement.

Features include:

- Timed assessments.
- Question progression.
- Scores.
- Multipliers.
- Leaderboards.
- High-score tracking.

Benefits:


- Encourages participation.
- Reinforces technical concepts.
- Promotes continuous learning.


---


## Settings Module


### Learner Settings

Learners can configure:

- Theme appearance.
- Display density.
- Profile information.
- Accessibility preferences.

### Assessor Settings

Assessors can configure:

- Dashboard preferences.
- Notification settings.
- Default landing pages.
- Account information.


---

## Assessor Dashboard

The Assessor Dashboard provides visibility into:

### Learner Analytics

- Total learners
- Completion rates
- Outstanding work
- Learner status indicators

### Recent Activity

Examples include:

- Task submissions
- Support requests
- Review requests


### Upcoming Sessions


Assessors can:

- Review scheduled sessions.
- Monitor booking status.
- Plan support workloads.


---


## Learner Management Module

Assessors can:

- Search learners.
- Filter learners.
- View academic records.
- Access learner profiles.
- Review completion statistics.
The module supports:

- Pagination
- Status filtering
- Learner performance monitoring
---

## Booking Management Module

Assessors may:

### Review Requests

- View pending bookings.
- Monitor schedules.

### Manage Sessions

- Confirm bookings.
- Decline requests.
- Reschedule appointments.
- Cancel sessions.

Administrative views include:

- Booking statistics.
- Date-range filtering.
- Status filtering.
---

## Non-Functional Requirements

### Security

- Secure user authentication. 
- Encrypted password storage.
- Role-based access control.

### Usability

- Responsive interface.
- User-friendly navigation.
- Clear visual hierarchy.

### Performance

- Fast dashboard loading.
- Efficient search functionality.
- Scalable user management.

### Reliability

- Consistent data storage.
- Accurate progress tracking.
- Reliable appointment scheduling.

### Accessibility

- Theme customization.
- User preference management.
- Adaptive display options.
----
## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js

### Database

- Firebase API

### Authentication

- JWT Authentication

### Version Control
- Git
- GitHub

### Development Environment

- Visual Studio Code
- Git Bash
- PowerShell 
______________________________
## IDE and GitHub Setup

### Install Required Software

1. Install Git.
2. Install Visual Studio Code.
3. Create a GitHub account.
4. Configure Git credentials.

```bash
git config --global user.name "Your Name" eh. Dimakatso 
git config --global user.email "youremail@example.com" eh., DimakatsoMosima@tpcstudents.co.za
